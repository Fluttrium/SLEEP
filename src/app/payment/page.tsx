"use client";
import { Container } from "../../../shared/components/shared/container";
import { Title } from "../../../shared/components/shared/title";
import {
  CreditCard,
  ShieldCheck,
  Truck,
  BadgePercent,
  Clock,
  PhoneCall
} from "lucide-react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Регистрация необходимых компонентов Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement
);

export default function Payment() {
  // Данные для линейного графика
  const paymentData = {
    labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
    datasets: [
      {
        label: 'Успешные оплаты',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4
      },
    ],
  };

  // Данные для круговой диаграммы
  const methodsData = {
    labels: ['Карты', 'Наличные', 'Рассрочка'],
    datasets: [
      {
        data: [70, 25, 5],
        backgroundColor: ['#2563eb', '#3b82f6', '#60a5fa'],
        borderWidth: 0,
        hoverOffset: 10
      },
    ],
  };

  // Опции для графиков
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <>
      <Container className="mt-10">
        <Title 
          text="Оплата услуг" 
          size="lg" 
          className="font-extrabold px-4 text-3xl text-gray-900"
        />
      </Container>

      <Container className="mt-10 pb-14 space-y-12">
        {/* Блок преимуществ */}
        <div className="grid md:grid-cols-3 gap-6 px-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <CreditCard className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Безопасная оплата</h3>
            <p className="text-gray-600 text-sm">
              SSL-шифрование и соответствие стандартам PCI DSS
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Гарантия возврата</h3>
            <p className="text-gray-600 text-sm">
              14 дней на возврат товара при необходимости
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Truck className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
            <p className="text-gray-600 text-sm">
              Получите заказ за 1-3 дня в любой точке страны
            </p>
          </div>
        </div>

        {/* Графики */}
        <div className="grid md:grid-cols-2 gap-8 px-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-6">Динамика успешных оплат</h3>
            <div className="h-64">
              <Line data={paymentData} options={lineOptions} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-6">Распределение методов оплаты</h3>
            <div className="h-64">
              <Pie data={methodsData} options={pieOptions} />
            </div>
          </div>
        </div>

        {/* Процесс оплаты */}
        <div className="px-4">
          <h2 className="text-2xl font-bold mb-8">Как оплатить заказ</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {icon: CreditCard, title: "Выберите способ", text: "Карта или наличные"},
              {icon: BadgePercent, title: "Укажите данные", text: "Без комиссии"},
              {icon: Clock, title: "Подтверждение", text: "Мгновенная проверка"},
              {icon: Truck, title: "Доставка", text: "Отслеживание в реальном времени"},
            ].map((step, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <step.icon className="w-8 h-8 text-blue-600 mb-4" />
                <div className="text-blue-600 font-bold mb-2">Шаг {i+1}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Контакты */}
        <div className="bg-blue-50 rounded-xl p-8 mx-4">
          <div className="max-w-4xl mx-auto text-center">
            <PhoneCall className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Нужна помощь с оплатой?</h2>
            <p className="text-gray-600 mb-6">
              Наши специалисты доступны 24/7 для консультации по любым вопросам
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a 
                href="tel:+789210112794" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Позвонить сейчас
              </a>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Онлайн-чат
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}