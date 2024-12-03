import { marked } from "marked";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
    author: string;
    title: string;
    description: string; // Markdown текст
    categories: string[];
    image?: string; // Опциональный параметр для изображения
}

export function PostsCard({ author, title, description, categories, image }: PostCardProps) {
    const descriptionHtml = marked(description);

    return (
        <div className="max-w-xs w-full group/card">
            <div className="cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl max-w-sm mx-auto flex flex-col justify-between p-4">
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-md absolute top-0 left-0 z-0"
                    />
                )}
                <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60 z-10"></div>
                <div className="flex flex-row items-center space-x-4 z-20">
                    <div className="flex flex-col">
                        <p className="font-normal text-base text-gray-50 relative z-10">
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <Badge key={index} className="text-gray-200 mr-2">
                                        {category.trim()}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-gray-400">Нет категорий</span>
                            )}
                        </p>
                    </div>
                </div>
                <div className="text content z-20 relative">
                    <h1 className="font-bold text-xl md:text-2xl text-gray-50">{title}</h1>
                    <div className="text-balance font-normal text-sm text-gray-50 my-4 line-clamp-3">
                        <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
