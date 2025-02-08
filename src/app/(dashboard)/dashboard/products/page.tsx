import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";  // Импорт кнопки для удаления

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
  category: {
    name: string;
  };
  price: number; // Поле для отображения цены
}

export default function DashboardProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsRes = await fetch('/api/products');  // Путь к вашему API
        const productsData = await productsRes.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }
    fetchData();
  }, []);

  // Обработчик для удаления товара
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));  // Удаляем товар из списка
      }
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Список товаров</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h2 className="text-xl font-bold mt-4">{product.name}</h2>
            <p>Категория: {product.category?.name || "Категория не указана"}</p>
            <p className="mt-2 text-lg font-semibold">Цена: {product.price} руб.</p> {/* Отображаем цену */}

            <div className="mt-4 flex justify-between">
            <Button onClick={() => handleDeleteProduct(product.id)} variant="destructive">
  Удалить
</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
