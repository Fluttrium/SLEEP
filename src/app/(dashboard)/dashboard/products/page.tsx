"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

interface FormData {
  name: string;
  imageUrl: string;
  categoryId: number;
}

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
  category: {
    name: string;
  };
}

export default function DashboardProducts() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [message, setMessage] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        
        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`Продукт успешно добавлен с ID: ${result.id}`);
        reset();
        setProducts(prev => [...prev, result]);
      } else {
        setMessage(`Ошибка: ${result.error}`);
      }
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
      setMessage('Ошибка при добавлении продукта');
    }
  };

  async function deleteProduct(id: number) {
    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      } else {
        console.error('Ошибка при удалении:', await response.text());
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Конструктор товаров</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="grid grid-cols-1 gap-4">
          <label className="block">
            Название:
            <input
              type="text"
              {...register('name', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block">
            Ссылка на изображение:
            <input
              type="text"
              {...register('imageUrl', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block">
            Категория:
            <select
              {...register('categoryId', { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Выберите категорию</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Добавить продукт
          </button>
        </div>
      </form>

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
      <button
        onClick={() => deleteProduct(product.id)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Удалить
      </button>
    </div>
  ))}
</div>
    </div>
  );
}