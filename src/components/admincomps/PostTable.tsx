import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import * as React from "react";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {Category} from "@prisma/client";
import {usePostRedactorStore} from "@/app/admin/_store/adminpageStore";
import {Badge} from "@/components/ui/badge"

interface Post {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    published: boolean;
    authorId: number;
    categories: Category[];
}

export function PostTable() {
    const [post, setPost] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/admin/post");
                const data = await response.json();
                console.log("Полученные посты с категориями:", data); // Выводим данные в консоль
                setPost(data);

            } catch (error) {
                console.error("Ошибка при получении данных:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    const {setIsCreatingPost, setCreatedTestPost} = usePostRedactorStore()

    const handleEditClick = (post: Post) => {
        setCreatedTestPost(post); // Установите ID теста для редактирования
        setIsCreatingPost(true); // Откройте редактор
    };
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Название</TableHead>
                    <TableHead>Публикация</TableHead>
                    <TableHead>Редактирование</TableHead>
                    <TableHead>Категории</TableHead>
                    <TableHead>Удалить</TableHead>
                    <TableHead>Редактировать</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {!loading && post.length > 0 ? (
                    post.map((post: Post) => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell>{format(new Date(post.createdAt), "dd.MM.yyyy HH:mm")}</TableCell>
                            <TableCell
                                className="text-right">{format(new Date(post.updatedAt), "dd.MM.yyyy HH:mm")}</TableCell>
                            <TableCell>
                                {post.categories && post.categories.length > 0 ? (
                                    post.categories.map((category: Category) => (
                                        <Badge className='m-2' key={category.id}>
                                            {category.name}
                                        </Badge>
                                    ))
                                ) : (
                                    "Нет категорий"
                                )}
                            </TableCell>
                            <TableCell>
                                <Button variant="destructive" size="sm">Удалить</Button>
                            </TableCell>
                            <TableCell>
                                <Button size="sm" onClick={() => handleEditClick(post)}>Редактировать</Button>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            {loading ? "Загрузка..." : "Нет данных"}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
