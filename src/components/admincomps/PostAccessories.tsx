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
import { Ingredient } from "@prisma/client";

interface IngredientFormData {
  name: string;
  price: number;
  imageFile: FileList;
}

export function PostAccessories() {
  const [accessories, setAccessories] = useState<Ingredient[]>([]);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IngredientFormData>();

  const fetchAccessories = async () => {
    try {
      const response = await fetch("/api/ingredients");
      const data = await response.json();
      setAccessories(data);
    } catch (error) {
      console.error("Ошибка при получении аксессуаров:", error);
    }
  };

  const deleteAccessory = async (id: number) => {
    if (!window.confirm("Вы уверены, что хотите удалить аксессуар?")) return;
    
    try {
      const response = await fetch(`/api/ingredients?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Аксессуар успешно удалён!");
        await fetchAccessories();
      } else {
        const error = await response.json();
        setMessage(error.error || "Ошибка при удалении аксессуара");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setMessage("Ошибка при удалении аксессуара");
    }
  };

  const onSubmit: SubmitHandler<IngredientFormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price.toString());
      
      if (data.imageFile && data.imageFile[0]) {
        formData.append("imageFile", data.imageFile[0]);
      }
      
      const response = await fetch("/api/ingredients", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Аксессуар успешно создан!");
        reset();
        await fetchAccessories();
      } else {
        setMessage(result.error || "Ошибка при создании аксессуара");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      setMessage("Ошибка при создании аксессуара");
    }
  };

  useEffect(() => {
    fetchAccessories();
  }, []);

  return (
    <div className="absolute bottom-0 right-0 pb-5 pr-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' className="m-5">
            <FolderPlus className="mr-2" /> Аксессуар
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Управление аксессуарами</DialogTitle>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <div>
                <label>Название аксессуара:</label>
                <input
                  {...register("name", { required: true })}
                  className="mt-1 block w-full p-2 border rounded-md"
                />
                {errors.name && <span className="text-red-500">Обязательное поле</span>}
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
                <label>Изображение аксессуара:</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("imageFile", { required: true })}
                  className="mt-1 block w-full p-2 border rounded-md"
                />
                {errors.imageFile && <span className="text-red-500">Обязательное поле</span>}
              </div>
              
              <Button type="submit">Создать аксессуар</Button>
              {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
            </form>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Существующие аксессуары:</h3>
              <ul className="space-y-2">
                {accessories.map(accessory => (
                  <li 
                    key={accessory.id}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded-md"
                  >
                    <div className="flex items-center gap-4">
                      <img src={accessory.imageUrl} alt={accessory.name} className="w-12 h-12 rounded" />
                      <span>{accessory.name} - {accessory.price} ₽</span>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteAccessory(accessory.id)}
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