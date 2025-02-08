import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChooseProductModal } from '../../../../../shared/components/shared';
import { ProductWithRelations } from '../../../../../@types/prisma';
import { Category2 } from '@prisma/client';

interface ProductItem {
  id: number;
  price: number;
  size: number | null;
  pizzaType: number | null;
  productId: number;
}

interface Ingredient {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
  category: Category2; // Теперь добавляем правильный тип для категории
  price: number;
  createdAt: Date;
  updatedAt: Date;
  items: ProductItem[];
  ingredients: Ingredient[];
}

export default function DashboardProducts() {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [categories, setCategories] = useState<Category2[]>([]); // Состояние для категорий
  const [selectedProduct, setSelectedProduct] = useState<ProductWithRelations | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Состояние для загрузки

  // Загрузка категорий
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();

        // Убедитесь, что data — это массив
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Ошибка: категории не в виде массива');
        }
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    }
    fetchCategories();
  }, []);

  // Загрузка продуктов
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (Array.isArray(data)) {
          const formattedData = data.map((product) => ({
            ...product,
            createdAt: new Date(product.createdAt),
            updatedAt: new Date(product.updatedAt),
            items: product.items || [],
            ingredients: product.ingredients || [],
          })) as ProductWithRelations[];
          setProducts(formattedData);
        } else {
          console.error('Ошибка: API не вернул массив');
        }
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Открытие модального окна
  const handleOpenModal = (product: ProductWithRelations) => {
    setSelectedProduct(product);
  };

  // Обработчик для удаления товара
  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

    try {
      const response = await fetch(`/api/products`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));  // Удаляем товар из списка
      } else {
        console.error("Ошибка при удалении товара");
      }
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Список товаров</h1>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            // Проверяем, что categories — это массив
            if (!Array.isArray(categories)) {
              console.error('Ошибка: categories не является массивом');
              return null;
            }

            const category = categories.find((cat) => cat.id === product.categoryId);
            return (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                onClick={() => handleOpenModal(product)}
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
                <h2 className="text-xl font-bold mt-4">{product.name}</h2>
                <p>Категория: {category?.name || 'Категория не указана'}</p>
                <p className="mt-2 text-lg font-semibold">Цена: {product.price} руб.</p>

                <div className="mt-4 flex justify-between">
                  <Button variant="secondary">Подробнее</Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteProduct(product.id);
                    }}
                    variant="destructive"
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedProduct && (
        <ChooseProductModal product={selectedProduct} className="max-w-lg" />
      )}
    </div>
  );
}
