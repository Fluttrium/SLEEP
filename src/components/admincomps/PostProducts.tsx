import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";

interface ProductFormData {
    name: string;
    imageFile: FileList;
    categoryId: number;
    price: number;
    accessories: number[];
}

interface Category {
    id: number;
    name: string;
}

interface Ingredient {
    id: number;
    name: string;
    price: number;
}

export function PostProducts() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/categories");
                if (!response.ok) throw new Error("Ошибка загрузки категорий");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Ошибка при получении категорий:", error);
            }
        };

        const fetchIngredients = async () => {
            try {
                const response = await fetch("/api/ingredients");
                if (!response.ok) throw new Error("Ошибка загрузки ингредиентов");
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("Ошибка при получении ингредиентов:", error);
            }
        };

        Promise.all([fetchCategories(), fetchIngredients()]).then(() => setLoading(false));
    }, []);

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("categoryId", data.categoryId.toString());
            formData.append("price", data.price.toString());

            if (data.imageFile && data.imageFile[0]) {
                formData.append("imageFile", data.imageFile[0]);
            }

            if (selectedCategory && categories.find(cat => cat.id === selectedCategory)?.name !== "Аксессуары") {
                formData.append("accessories", JSON.stringify(data.accessories));
            }

            const response = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setMessage("Товар успешно добавлен!");
                reset();
            } else {
                setMessage("Ошибка при добавлении товара");
            }
        } catch (error) {
            console.error("Ошибка:", error);
            setMessage("Ошибка при добавлении товара");
        }
    };

    return (
        <div>
            <div className='absolute bottom-40 right-0 pb-5 pr-5'>
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
                                    <input {...register("name", { required: true })} className="mt-1 block w-full p-2 border rounded-md" />
                                    {errors.name && <span className="text-red-500">Обязательное поле</span>}
                                </div>

                                <div>
                                    <label>Изображение товара:</label>
                                    <input type="file" accept="image/*" {...register("imageFile", { required: true })} className="mt-1 block w-full" />
                                    {errors.imageFile && <span className="text-red-500">Обязательное поле</span>}
                                </div>

                                <div>
                                    <label>Цена:</label>
                                    <input type="number" {...register("price", { required: true })} className="mt-1 block w-full p-2 border rounded-md" />
                                    {errors.price && <span className="text-red-500">Обязательное поле</span>}
                                </div>

                                <div>
                                    <label>Категория:</label>
                                    <select {...register("categoryId", { required: true })} className="mt-1 block w-full p-2 border rounded-md" onChange={(e) => setSelectedCategory(Number(e.target.value))}>
                                        <option value="">Выберите категорию</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                    {errors.categoryId && <span className="text-red-500">Обязательное поле</span>}
                                </div>

                                {selectedCategory && categories.find(cat => cat.id === selectedCategory)?.name !== "Аксессуары" && (
                                    <div>
                                        <label>Выберите ингредиенты:</label>
                                        <div className="mt-1 grid grid-cols-2 gap-2">
                                            {ingredients.map((ingredient) => (
                                                <label key={ingredient.id} className="flex items-center">
                                                    <input type="checkbox" value={ingredient.id} {...register("accessories")} className="mr-2" />
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
