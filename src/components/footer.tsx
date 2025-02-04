"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HeartIcon,
  DocumentTextIcon,
  BookOpenIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChatBubbleBottomCenterTextIcon,
  UserGroupIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon,
  LifebuoyIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Stethoscope } from 'lucide-react';

const Footer = () => {
  const [currentYear, setCurrentYear] = useState('2025');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Медицинские услуги */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-blue-600" />
              Медицинские услуги
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/diagnostics" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <HeartIcon className="w-5 h-5" />
                  Диагностика
                </Link>
              </li>
              <li>
                <Link href="/consultations" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <DocumentTextIcon className="w-5 h-5" />
                  Лечение
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
                  Консультации
                </Link>
              </li>
              <li>
                <Link href="/rehabilitation" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <BookOpenIcon className="w-5 h-5" />
                  Статьи
                </Link>
              </li>
            </ul>
          </div>

          {/* Пациентам */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <UserGroupIcon className="w-6 h-6 text-blue-600" />
              Пациентам
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/appointment" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <CalendarIcon className="w-5 h-5" />
                  Запись онлайн
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <CurrencyDollarIcon className="w-5 h-5" />
                  Цены
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <DocumentTextIcon className="w-5 h-5" />
                  Опрос
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <UserGroupIcon className="w-5 h-5" />
                  Врачи
                </Link>
              </li>
            </ul>
          </div>

          {/* Сервисная информация */}
          <div className="space-y-6">
            <Link href="/payment" className="flex items-start space-x-4 hover:text-blue-600 transition-colors group">
              <CreditCardIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0 group-hover:text-blue-700" />
              <div>
                <h5 className="font-medium text-gray-800 group-hover:text-blue-600">Оплата</h5>
                <p className="text-gray-600 text-sm group-hover:text-blue-500">
                  Наличные и безналичный расчет
                </p>
              </div>
            </Link>

            <Link href="/garanty" className="flex items-start space-x-4 hover:text-blue-600 transition-colors group">
              <ShieldCheckIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0 group-hover:text-blue-700" />
              <div>
                <h5 className="font-medium text-gray-800 group-hover:text-blue-600">Гарантия</h5>
                <p className="text-gray-600 text-sm group-hover:text-blue-500">
                Официальные договора
                </p>
              </div>
            </Link>

            <Link href="/contacts" className="flex items-start space-x-4 hover:text-blue-600 transition-colors group">
              <LifebuoyIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0 group-hover:text-blue-700" />
              <div>
                <h5 className="font-medium text-gray-800 group-hover:text-blue-600">Контакты</h5>
                <p className="text-gray-600 text-sm group-hover:text-blue-500">
                Круглосуточная поддержка
                </p>
              </div>
            </Link>

            <Link href="/delivery" className="flex items-start space-x-4 hover:text-blue-600 transition-colors group">
              <TruckIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0 group-hover:text-blue-700" />
              <div>
                <h5 className="font-medium text-gray-800 group-hover:text-blue-600">Доставка</h5>
                <p className="text-gray-600 text-sm group-hover:text-blue-500">
                Лекарств и медицинских изделий
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} Asleep. Все права защищены
            </p>
            <div className="flex space-x-6">
            <button 
            onClick={() => setIsOfferModalOpen(true)} 
            className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
          >
            Договор оферты
          </button>
              <button onClick={() => setIsModalOpen(true)} className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                Пользовательское соглашение
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOfferModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Договор оферты</h2>
            <p className="text-sm text-gray-600">
              ОПРЕДЕЛЕНИЕ ТЕРМИНОВ
              <br />
              1.1. Публичная оферта (далее – «Оферта») - публичное предложение Продавца, адресованное неопределенному кругу лиц... 
              <br />
              {/* Добавь сюда остальной текст договора */}
            </p>
            <button 
              onClick={() => setIsOfferModalOpen(false)} 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
    <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition">
              <XMarkIcon className="w-6 h-6" />
            </button>
      <h2 className="text-lg font-semibold mb-4">Пользовательское соглашение</h2>
      <p className="text-sm text-gray-700 mb-4">
        Настоящий документ «Политика конфиденциальности» представляет собой правила использования сайтом www.daggerrknives.ru (ООО "ФИНМОДЕЛЬ") персональной информации Пользователя, которую Оператор может получить во время использования Пользователем любого из сайтов, сервисов, служб, программ, продуктов или услуг Оператора. Использование Сайта означает безоговорочное согласие Пользователя с настоящей Политикой.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        1. Общие положения политики
        1.1. Настоящая Политика является неотъемлемой частью Публичной оферты, размещенной в сети Интернет.
        1.2. Настоящая Политика составлена в соответствии с Федеральным законом «О персональных данных» № 152-ФЗ.
        1.3. Оператор имеет право вносить изменения в настоящую Политику. Новая редакция вступает в силу с момента ее размещения на сайте.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        2. Персональная информация Пользователей, которую обрабатывает Сайт
        2.1. Под персональной информацией понимается:
        2.1.1. Информация, предоставляемая Пользователем самостоятельно при регистрации.
        2.1.2. Данные, передаваемые автоматически, включая IP-адрес, файлы cookie, информацию о браузере и оборудовании.
        2.1.3. Иная информация, обработка которой предусмотрена условиями использования Сайта.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        3. Цели обработки персональной информации Пользователей
        3.1. Сайт собирает и хранит персональную информацию для предоставления сервисов и исполнения соглашений.
        3.2. Основные цели обработки:
        - Идентификация стороны в рамках сервисов.
        - Предоставление персонализированных сервисов и услуг.
        - Направление уведомлений, запросов и информации.
        - Улучшение качества работы Сайта.
        - Таргетирование рекламных материалов.
        - Проведение статистических и иных исследований.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        4. Условия обработки персональной информации Пользователей и её передачи третьим лицам
        4.1. Персональная информация Пользователя сохраняется в конфиденциальности.
        4.2. Передача информации третьим лицам возможна при:
        - Согласии Пользователя.
        - Необходимости для работы сервиса.
        - Требованиях законодательства.
        - Продажи или передачи бизнеса.
        - Нарушении Пользователем условий использования Сайта.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        5. Изменение и удаление персональной информации
        5.1. Пользователь может изменить или удалить персональную информацию, обратившись к Оператору.
        5.2. В некоторых случаях законодательство может требовать сохранения информации в течение определенного срока.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        6. Обработка персональной информации при помощи файлов Cookie и счетчиков
        6.1. Файлы cookie используются для персонализации сервисов, рекламы и статистических исследований.
        6.2. Пользователь может отключить файлы cookie в настройках браузера.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        7. Защита персональной информации
        7.1. Оператор предпринимает меры для защиты персональной информации от неправомерного доступа, уничтожения, изменения и распространения.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        8. Изменение Политики конфиденциальности
        8.1. Политика конфиденциальности может изменяться. Новая редакция вступает в силу с момента публикации.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        9. Контакты
        9.1. Вопросы по поводу Политики можно направлять на info@daggerrknives.ru
      </p>
      <div className="flex justify-end">
        <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Закрыть
        </button>
      </div>
    </div>
  </div>
)}
    </footer>
  );
};

export default Footer;