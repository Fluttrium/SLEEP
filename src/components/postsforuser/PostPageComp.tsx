"use client";

import React, { useEffect, useState } from "react";
import { PostsCard } from "@/components/postsforuser/PostCard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Cat {
    id: number;
    name: string;
}

export type Post = {
    id: number;
    title: string;
    body: string;
    published: boolean;
    imageUrl?: string;
    categories?: string[];
};

export function PostPageComp() {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [categories, setCategories] = useState<Cat[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Состояние для выбранной категории
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
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

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/articles/cat");
            if (!response.ok) {
                throw new Error("Не удалось загрузить категории");
            }
            const data: Cat[] = await response.json();
            setCategories(data);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Неизвестная ошибка");
            console.error("Ошибка при получении категорий:", error);
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

        Promise.all([fetchPosts(), fetchCategories()]).then(() => {
            setProgress(100);
        });

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Periodically fetch posts to keep them updated
    useEffect(() => {
        const updateInterval = setInterval(() => {
            fetchPosts();
        }, 60000); // Update every 60 seconds

        return () => clearInterval(updateInterval);
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

    // Фильтруем посты на основе выбранной категории
    const filteredPosts = selectedCategory
        ? posts.filter((post) => post.categories?.includes(selectedCategory))
        : posts;

    const handleCardClick = (title: string) => {
        const encodedTitle = encodeURIComponent(title);
        router.push(`/articles/${encodedTitle}`);
    };

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory((prev) => (prev === categoryName ? null : categoryName)); // Сбрасываем, если категория уже выбрана
    };

    return (
        <section className="w-screen h-screen px-4 pt-10 pb-20 sm:pb-0 overflow-y-auto">
            {/* Отображаем категории */}
            <div className="h-9 w-full flex my-6 gap-4">
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        className={`px-4 py-2 rounded-md transition ${
                            selectedCategory === category.name
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            {/* Отображаем посты */}
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {filteredPosts.map((post) => (
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
