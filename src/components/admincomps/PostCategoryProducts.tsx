'use client'

import { Button } from "@/components/ui/button";
import { FolderPlus, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Category } from "@prisma/client";

interface CategoryFormData {
  name: string;
}

export function PostCategoryProducts() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState("");
  const { 
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategoryFormData>();

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Ошибка при получении категорий:", error);
    }
  };

  const deleteCategory = async (id: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить категорию?")) return;
    
    try {
      const response = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Категория успешно удалена!");
        await fetchCategories();
      } else {
        const error = await response.json();
        setMessage(error.error || "Ошибка при удалении категории");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setMessage("Ошибка при удалении категории");
    }
  };

  const onSubmit: SubmitHandler<CategoryFormData> = async (data) => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Категория успешно создана!");
        reset();
        await fetchCategories();
      } else {
        setMessage(result.error || "Ошибка при создании категории");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setMessage("Ошибка при создании категории");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="absolute bottom-0 right-0 pb-5 pr-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' className="m-5">
            <FolderPlus className="mr-2" /> Категория
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Управление категориями</DialogTitle>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div>
                <label>Название категории:</label>
                <input
                  {...register("name", { required: true })}
                  className="mt-1 block w-full p-2 border rounded-md"
                />
                {errors.name && <span className="text-red-500">Обязательное поле</span>}
              </div>
              
              <Button type="submit">Создать категорию</Button>
              {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
            </form>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Существующие категории:</h3>
              <ul className="space-y-2">
                {categories.map(category => (
                  <li 
                    key={category.id}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                  >
                    <span>{category.name}</span>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteCategory(category.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}