'use client';
import { useEffect, useState } from 'react';

interface CPAPMachine {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
}

export default function CPAPMachineList() {
  const [machines, setMachines] = useState<CPAPMachine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCPAPMachines = async () => {
      try {
        const res = await fetch('/api/cpap-machines');
        if (!res.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const data = await res.json();
        if (data.cpapMachines && data.cpapMachines.length > 0) {
          setMachines(data.cpapMachines);
        } else {
          setError('Нет доступных CPAP аппаратов');
        }
      } catch (error) {
        setError('Не удалось загрузить CPAP аппараты. Попробуйте позже.');
        console.error('Ошибка при загрузке данных', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCPAPMachines();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center my-6 text-gray-800 dark:text-white">Список CPAP аппаратов</h2>
      {machines.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300">Нет аппаратов для отображения</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine) => (
            <div
              key={machine.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
            >
              {/* Изображение аппарата */}
              <div className="relative w-full h-48">
                <img
                  src={machine.image || "/default-cpap-image.jpg"} // Дефолтное изображение, если у аппарата нет
                  alt={machine.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Информация о аппарате */}
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{machine.name}</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{machine.description}</div>
                <div className="text-lg font-semibold text-gray-800 dark:text-white">{machine.price} ₽</div>
              </div>
              {/* Кнопка действия */}
              <div className="p-4 w-full">
                <button
                  className="bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 dark:to-zinc-900 w-full text-white rounded-md h-10 text-sm font-medium"
                  onClick={() => alert(`Купить ${machine.name}`)} // Замените на логику покупки
                >
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
