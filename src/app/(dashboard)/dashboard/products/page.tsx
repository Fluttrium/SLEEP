"use client";

import React, { useEffect, useState } from "react";

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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsRes = await fetch('/api/products');
        const productsData = await productsRes.json();
        setProducts(productsData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }
    fetchData();
  }, []);

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
          </div>
        ))}
      </div>
    </div>
  );
}
