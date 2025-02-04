"use client";
import { Container } from "../../../shared/components/shared/container";
import { Title } from "../../../shared/components/shared/title";
import { Truck, Clock, MapPin, ShieldCheck, PackageCheck } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
import { YMaps, Map, Placemark, ZoomControl, Polygon } from '@pbe/react-yandex-maps';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

export default function Delivery() {
  const deliveryData = {
    labels: ['Москва', 'СПб', 'Казань', 'Екатеринбург', 'Новосибирск'],
    datasets: [
      {
        label: 'Срок доставки (дни)',
        data: [1, 2, 3, 4, 5],
        borderColor: '#2563eb',
        tension: 0.4,
      },
    ],
  };

    // Координаты основных городов
    const cities = [
      { coord: [55.7558, 37.6176], name: 'Москва' },
      { coord: [59.9343, 30.3351], name: 'Санкт-Петербург' },
      { coord: [55.7961, 49.1064], name: 'Казань' },
      { coord: [56.8389, 60.6057], name: 'Екатеринбург' },
      { coord: [55.0084, 82.9357], name: 'Новосибирск' },
      { coord: [43.1155, 131.8855], name: 'Владивосток' },
      { coord: [53.1951, 50.1018], name: 'Самара' },
      { coord: [56.3269, 44.0065], name: 'Нижний Новгород' },
    ];
    
  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="pt-10">
        <Title 
          text="Доставка медицинских товаров" 
          size="lg" 
          className="font-extrabold text-3xl text-gray-900 mb-4"
        />
        <p className="text-gray-600 text-lg max-w-3xl">
          Быстрая и надежная доставка медицинских препаратов и оборудования по всей России
        </p>
      </Container>

      <Container className="mt-10 pb-14 space-y-12">
        {/* Способы доставки */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <Truck className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Курьерская доставка</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>・До двери в течение 1-3 дней</li>
              <li>・Отслеживание заказа онлайн</li>
              <li>・Страхование груза</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <MapPin className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Самовывоз</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>・200+ пунктов выдачи</li>
              <li>・Круглосуточные терминалы</li>
              <li>・Хранение до 7 дней</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <ShieldCheck className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Особые условия</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>・Температурный контроль</li>
              <li>・Срочная доставка 24/7</li>
              <li>・Спецтранспорт для оборудования</li>
            </ul>
          </div>
        </div>

        {/* График и карта */}
        <div className="grid md:grid-cols-2 gap-8">
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
      <Clock className="w-6 h-6" />
      Сроки доставки по регионам
    </h3>
    <div className="h-64">
      <Line data={deliveryData} />
    </div>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
      <MapPin className="w-6 h-6" />
      Зона покрытия доставки
    </h3>
    <div className="relative w-full h-64 rounded-lg overflow-hidden">
      <YMaps query={{ apikey: 'ВАШ_API_КЛЮЧ', lang: 'ru_RU' }}>
        <Map
          defaultState={{
            center: [61.698653, 99.505405],
            zoom: 3,
            controls: [],
          }}
          width="100%"
          height="100%"
        >
          <ZoomControl 
  options={{
    position: {
      top: "20px",
      right: "20px",
      bottom: "auto",
      left: "auto"
    },
    size: "large",
    visible: true,
    zoomDuration: 300
  }}
/>
          {/* Метки городов */}
          {[
            [55.7558, 37.6176], // Москва
            [59.9343, 30.3351], // СПб
            [55.7961, 49.1064], // Казань
            [56.8389, 60.6057], // Екатеринбург
            [55.0084, 82.9357], // Новосибирск
            [43.1155, 131.8855] // Владивосток
          ].map((coord, index) => (
            <Placemark
              key={index}
              geometry={coord}
              options={{
                preset: 'islands#blueCircleDotIcon',
                iconColor: '#2563eb',
              }}
            />
          ))}

          {/* Область покрытия */}
          <Polygon
        geometry={[[/* координаты границ РФ */]]}
        options={{
          fillColor: '#2563eb22',
          strokeColor: '#2563eb',
          strokeWidth: 1,
          opacity: 0.5
        }}
      />
        </Map>
      </YMaps>
      
      {/* Легенда */}
      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-sm text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>Города присутствия</span>
        </div>
      </div>
    </div>
    <p className="text-gray-600 text-sm mt-4">
      *Доставка осуществляется во все регионы РФ
    </p>
  </div>
</div>
        {/* FAQ */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-2xl font-bold mb-6">Частые вопросы</h3>
          <div className="space-y-4">
            {[
              {
                question: "Как отследить посылку?",
                answer: "Идентификатор для отслеживания придет в SMS после отправки"
              },
              {
                question: "Есть ли доставка в выходные?",
                answer: "Да, курьерская доставка работает 7 дней в неделю"
              },
              {
                question: "Как хранятся скоропортящиеся препараты?",
                answer: "Используем специальные термоконтейнеры с датчиками температуры"
              }
            ].map((item, index) => (
              <div key={index} className="border-b border-gray-100 pb-4">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer">
                    <span className="text-gray-800 font-medium">{item.question}</span>
                    <span className="text-blue-600 group-open:hidden">+</span>
                    <span className="text-blue-600 hidden group-open:inline">−</span>
                  </summary>
                  <p className="text-gray-600 mt-2 text-sm">{item.answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Контакты */}
        <div className="bg-blue-50 rounded-xl p-8">
          <div className="max-w-4xl mx-auto text-center">
            <PackageCheck className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Нужна срочная доставка?</h2>
            <p className="text-gray-600 mb-6">
              Наши логисты готовы организовать экстренную доставку медицинских грузов
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <a 
                href="tel:+789210112794" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Экстренная доставка
              </a>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Чат с оператором
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}