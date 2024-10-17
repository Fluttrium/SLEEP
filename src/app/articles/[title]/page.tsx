"use client";
import {useEffect, useState} from "react";
import {Category} from "@prisma/client";
import {MdPreview} from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import {Badge} from "@/components/ui/badge";

export type Post = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    published: boolean;
    authorId: string;
    categories?: Category[]; // Добавьте это поле
};


export default function Page({params}: { params: { title: string } }) {
    const [article, setArticle] = useState<Post | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`/api/posts/${params.title}`);
                if (!response.ok) {
                    throw new Error("Ошибка загрузки поста");
                }
                const data: Post = await response.json();
                setArticle(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [params.title]);

    if (loading) {
        return <div>Загрузка...</div>; // Индикатор загрузки
    }

    if (error) {
        return <div>Ошибка: {error}</div>; // Сообщение об ошибке
    }

    if (!article) {
        return <div>Пост не найден</div>; // Сообщение, если пост не найден
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className='flex flex-row gap-2'>
                {article.categories!.map((category: Category) => (
                    <Badge key={category.id} variant="outline">{category.name}</Badge> // Используем переменную category.name
                ))}
            </div>
            <MdPreview modelValue={article.body}/>
        </div>
    );
}
