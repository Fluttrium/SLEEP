import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import * as React from "react";
import {format} from "date-fns";
import {Button} from "@/components/ui/button";
import {$Enums, Category} from "@prisma/client";
import {usePostRedactorStore} from "@/app/admin/_store/adminpageStore";
import {Badge} from "@/components/ui/badge";
import {Plus} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import PostType = $Enums.PostType;

// Интерфейс для постов
interface Post {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    published: boolean;
    authorId: number;
    categories: Category[];
    image?: string;
    posttype: PostType;
}


export function PostTable() {
    const [post, setPost] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [newPostTitle, setNewPostTitle] = React.useState("");

    const {setIsCreatingPost, setCreatedPost} = usePostRedactorStore();

    const fetchData = async () => {
        try {
            const response = await fetch("/api/admin/post");
            const data = await response.json();
            console.log("Полученные посты с категориями:", data);
            setPost(data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNewPost = async () => {
        if (!newPostTitle) {
            alert("Пожалуйста, введите заголовок статьи.");
            return;
        }

        const authorId = 1; // Здесь нужно указать реальный ID автора

        try {
            const response = await fetch("/api/admin/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: newPostTitle,
                    body: "Здесь содержимое статьи", // Здесь добавьте содержимое статьи, если нужно
                    authorId, // Передаем ID автора
                }),
            });

            if (response.ok) {
                // Сбросьте состояние заголовка нового поста
                setNewPostTitle("");
                // Перезагрузите данные
                await fetchData();
            } else {
                alert("Ошибка при создании статьи");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    const handleDeletePost = async (id: number) => {
        const confirmDelete = confirm("Вы уверены, что хотите удалить этот пост?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/api/admin/post/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Перезагрузите данные после успешного удаления
                await fetchData();
            } else {
                alert("Ошибка при удалении статьи");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleEditClick = (post: Post) => {
        setCreatedPost(post);
        setIsCreatingPost(true);
    };

    return (
        <div>
            <div className='absolute bottom-0 right-0 pb-5 pr-5'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='default' className="m-5">
                            <Plus/>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Создать новую статью</DialogTitle>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleCreateNewPost();
                                }}
                            >
                                <div>
                                    <label htmlFor="title">Заголовок:</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={newPostTitle}
                                        onChange={(e) => setNewPostTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit">Создать</Button>
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
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
                                    <Button variant="destructive" size="sm"
                                            onClick={() => handleDeletePost(post.id)}>Удалить</Button>
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
        </div>
    );
}
