"use client"
import React, {useEffect, useState} from "react";
import {PostsCard} from "@/components/postsforuser/PostCard";
import {Progress} from "@/components/ui/progress";
import {useRouter} from "next/navigation";


export type Post = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    published: boolean;
    authorId: string;
    categories?: string[]; // Добавьте это поле
};


export function PostPageComp() {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/articles');
            const data: Post[] = await response.json();
            setPosts(data);
        } catch (error) {
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

    if (!posts) {
        return <Progress value={progress}/>;
    }

    const handleCardClick = (title: string) => {
        router.push(`/articles/${title}`);
    };

    return (
        <section className='w-screen flex px-14 py-14'>
            <div className='grid grid-cols-4 gap-4'>
                {posts.map((post) => (
                    <div key={post.id} onClick={() => handleCardClick(post.title)}>
                        <PostsCard
                            author={post.title}
                            description={post.body}
                            title={post.title}
                            categories={post.categories!}// Передаем массив объектов категорий
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
