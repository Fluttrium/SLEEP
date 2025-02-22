"use client";

import React, {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Category2} from '@prisma/client';
import {ProductWithRelations} from "../../../../@types/prisma";
import {ChooseProductModal} from "../../../../shared/components/shared";

export default function DashboardProducts() {
    const [products, setProducts] = useState<ProductWithRelations[]>([]);
    const [categories, setCategories] = useState<Category2[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductWithRelations | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Загрузка данных
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesRes, productsRes] = await Promise.all([
                    fetch('/api/categories'),
                    fetch('/api/products')
                ]);

                const [categoriesData, productsData] = await Promise.all([
                    categoriesRes.json(),
                    productsRes.json()
                ]);

                setCategories(categoriesData);
                setProducts(productsData.map((product: any) => ({
                    ...product,
                    createdAt: new Date(product.createdAt),
                    updatedAt: new Date(product.updatedAt),
                    items: product.items || [],
                    ingredients: product.ingredients || []
                })));
            } catch (error) {
                console.error('Ошибка загрузки:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteProduct = async (id: number) => {
        if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

        try {
            await fetch(`/api/products`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id}),
            });
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    if (loading) {
        return <div className="text-center p-8">Загрузка...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-8">Управление товарами</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                    const category = categories.find(c => c.id === product.categoryId);
                    const firstItem = product.items[0];
                    const isPizza = firstItem?.pizzaType !== null;

                    return (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <div className="relative aspect-square overflow-hidden rounded-t-xl">
                                {product.imageUrl && (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                )}
                            </div>

                            <div className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-bold">{product.name}</h2>
                                    <span className="bg-gray-100 px-2 py-1 rounded-lg text-sm">
                    {category?.name || 'Без категории'}
                  </span>
                                </div>

                                <div className="space-y-2">
                                    {isPizza ? (
                                        product.items.map((item) => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span>{item.size} см</span>
                                                <span>{item.price} ₽</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex justify-between font-medium">
                                            <span>Цена:</span>
                                            <span>{firstItem?.price || 0} ₽</span>
                                        </div>
                                    )}
                                </div>

                                {product.ingredients.length > 0 && (
                                    <div className="text-sm text-gray-600">
                                        <p className="font-medium mb-1">Ингредиенты:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {product.ingredients.map((ingredient) => (
                                                <span
                                                    key={ingredient.id}
                                                    className="bg-gray-100 px-2 py-1 rounded-md"
                                                >
                          {ingredient.name}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2 mt-4">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Логика редактирования
                                        }}
                                    >
                                        Редактировать
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="flex-1"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteProduct(product.id);
                                        }}
                                    >
                                        Удалить
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedProduct && (
                <ChooseProductModal
                    product={selectedProduct}

                />
            )}
        </div>
    );
}