// components/ui/SearchInput.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Post {
    id: number;
    title: string;
}

export const SearchInput = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchResults = async () => {
            if (query.trim() === "") {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
                const data: Post[] = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Ошибка при получении результатов поиска:", error);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchResults();
        }, 300); // Задержка перед выполнением запроса

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSelect = (title: string) => {
        router.push(`/articles/${title}`); // Переход к посту при выборе
        setQuery(""); // Очищаем поле поиска
        setResults([]); // Очищаем результаты
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск..."
                className="border rounded px-2 py-1 w-full"
            />
            {query && (
                <div className="absolute z-10 bg-white border rounded shadow-md mt-1 w-full">
                    {loading ? (
                        <div className="p-2">Загрузка...</div>
                    ) : results.length > 0 ? (
                        results.map((result) => (
                            <div
                                key={result.id}
                                onClick={() => handleSelect(result.title)}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {result.title}
                            </div>
                        ))
                    ) : (
                        <div className="p-2">Нет результатов</div>
                    )}
                </div>
            )}
        </div>
    );
};
