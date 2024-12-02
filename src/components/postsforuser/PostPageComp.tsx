"use client";
import React, { useEffect, useState } from "react";
import { PostsCard } from "@/components/postsforuser/PostCard";
import { useRouter } from "next/navigation";

export type Post = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    published: boolean;
    authorId: string;
    categories?: string[];
};

export function PostPageComp() {
    const [posts, setPosts] = useState<Post[]>([]); // Инициализируем как массив
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/articles");
            if (!response.ok) {
                throw new Error(`HTTP ошибка! Статус: ${response.status}`);
            }
            const data: Post[] = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Ошибка при получении постов:", error);
            setError("Не удалось загрузить посты. Попробуйте позже.");
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => Math.min(oldProgress + 10, 90));
        }, 300);

        fetchPosts().then(() => setProgress(100)).catch(() => setProgress(100));

        return () => {
            clearInterval(interval);
        };
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!posts.length) {
        return <progress value={progress} max="100" />;
    }

    const handleCardClick = (title: string) => {
        router.push(`/articles/${title}`);
    };

    return (
        <section className="w-screen flex px-14 py-14">
            <div className="grid grid-cols-4 gap-4">
                {posts.map((post) => (
                    <div key={post.id} onClick={() => handleCardClick(post.title)}>
                        <PostsCard
                            author={post.title}
                            description={post.body}
                            title={post.title}
                            categories={post.categories || []} // Передаем массив
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
