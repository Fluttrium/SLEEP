import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Category, Ingredient, Product } from "@prisma/client";
import { usePostRedactorStore } from "@/app/admin/_store/adminpageStore";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Image from "next/image";

interface ProductFormData {
  name: string;
  imageFile: FileList;
  categoryId: number;
  price: number;
  accessories: number[]; // Поле для выбора аксессуаров
}

export function PostProducts() {
    const [products, setProducts] = React.useState<Product[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [ingredients, setIngredients] = React.useState<Ingredient[]>([]); // Стейт для ингредиентов
    const [selectedCategory, setSelectedCategory] = React.useState<number | null>(null);
    const [loading, setLoading] = React.useState(true);
    const { register, handleSubmit, reset, formState: { errors }, control } = useForm<ProductFormData>();
    const [message, setMessage] = React.useState("");
    const { setIsCreatingPost, setCreatedPost } = usePostRedactorStore();

    const fetchProducts = async () => {
        try {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Ошибка при получении товаров:", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch("/api/categories");
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error("Ошибка при получении категорий:", error);
        }
    };

    const fetchIngredients = async () => {
        try {
            const response = await fetch("/api/ingredients");
            const data = await response.json();
            setIngredients(data);
        } catch (error) {
            console.error("Ошибка при получении ингредиентов:", error);
        }
    };

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("categoryId", data.categoryId.toString());
            formData.append("price", data.price.toString());

            if (data.imageFile && data.imageFile[0]) {
                formData.append("imageFile", data.imageFile[0]);
            }

            // Добавляем аксессуары, если категория не "Аксессуары"
            if (selectedCategory !== categories.find(cat => cat.name === "Аксессуары")?.id) {
                formData.append("accessories", JSON.stringify(data.accessories));
            }

            console.log("Отправляемые данные:", Object.fromEntries(formData.entries()));

            const response = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Товар успешно добавлен!");
                reset();
                await fetchProducts();
            } else {
                setMessage(result.error || "Ошибка при добавлении товара");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            setMessage("Ошибка при добавлении товара");
        }
    };

    React.useEffect(() => {
        const loadData = async () => {
            await Promise.all([fetchProducts(), fetchCategories(), fetchIngredients()]); // Загружаем товары, категории и ингредиенты
            setLoading(false);
        };
        loadData();
    }, []);

    return (
        <div>
            <div className='absolute bottom-10 right-0 pb-5 pr-5'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant='default' className="m-5">
                            <Plus />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Создать новый товар</DialogTitle>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label>Название товара:</label>
                                    <input
                                        {...register("name", { required: true })}
                                        className="mt-1 block w-full p-2 border rounded-md"
                                    />
                                    {errors.name && <span className="text-red-500">Обязательное поле</span>}
                                </div>

                                <div>
                                    <label>Изображение товара:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        {...register("imageFile", { required: true })}
                                        className="mt-1 block w-full"
                                    />
                                    {errors.imageFile && <span className="text-red-500">Обязательное поле</span>}
                                </div>

                                <div>
                                    <label>Цена:</label>
                                    <input
                                        type="number"
                                        {...register("price", { required: true })}
                                        className="mt-1 block w-full p-2 border rounded-md"
                                    />
                                    {errors.price && <span className="text-red-500">Обязательное поле</span>}
                                </div>

                                <div>
                                    <label>Категория:</label>
                                    <select
                                        {...register("categoryId", { required: true })}
                                        className="mt-1 block w-full p-2 border rounded-md"
                                        onChange={(e) => setSelectedCategory(Number(e.target.value))}
                                    >
                                        <option value="">Выберите категорию</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.categoryId && <span className="text-red-500">Обязательное поле</span>}
                                </div>

                                {/* Выбор ингредиентов, если категория не "Аксессуары" */}
                                {selectedCategory && categories.find(cat => cat.id === selectedCategory)?.name !== "Акссесуары" && (
                                    <div>
                                        <label>Выберите ингредиенты:</label>
                                        <div className="mt-1 grid grid-cols-2 gap-2">
                                            {ingredients.map((ingredient) => (
                                                <label key={ingredient.id} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        value={ingredient.id}
                                                        {...register("accessories")} // Мы все равно используем "accessories" в форме
                                                        className="mr-2"
                                                    />
                                                    {ingredient.name} ({ingredient.price} руб.)
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <Button type="submit">Создать товар</Button>
                                {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
                            </form>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
