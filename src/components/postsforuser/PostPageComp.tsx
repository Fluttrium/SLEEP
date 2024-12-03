"use client";
import React, {useEffect, useState} from "react";
import {PostsCard} from "@/components/postsforuser/PostCard";
import {useRouter} from "next/navigation";

export type Post = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    published: boolean;
    authorId: string;
    categories?: string[];
    imageUrl?: string;
};

export function PostPageComp() {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null); // Добавим состояние для ошибок
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/articles");
            if (!response.ok) {
                throw new Error("Не удалось загрузить посты");
            }
            const data: Post[] = await response.json();
            setPosts(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Неизвестная ошибка");
            console.error("Ошибка при получении постов:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return oldProgress + 10;
            });
        }, 300);

        fetchPosts().then(() => {
            setProgress(100);
        });

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (error) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!posts) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <progress value={progress} className="w-1/2 md:w-1/3 lg:w-1/4"/>
            </div>
        );
    }

    const handleCardClick = (title: string) => {
        router.push(`/articles/${title}`);
    };

    return (
        <section className="w-screen h-screen px-4 pt-10 pb-20 sm:pb-0 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        onClick={() => handleCardClick(post.title)}
                        className="cursor-pointer snap-center"
                    >
                        <PostsCard
                            author={post.title}
                            description={post.body}
                            title={post.title}
                            categories={post.categories || []}
                            image={post.imageUrl} // Используем imageUrl для фона
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
