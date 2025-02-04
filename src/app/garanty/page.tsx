"use client";
import { Container } from "../../../shared/components/shared/container";
import { Title } from "../../../shared/components/shared/title";
import { ShieldCheck, AlertTriangle, Mail, Wrench, Package } from "lucide-react";

export default function Warranty() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="pt-10">
        <Title 
          text="Гарантийные обязательства" 
          size="lg" 
          className="font-extrabold text-3xl text-gray-900 mb-4"
        />
      </Container>

      <Container className="mt-8 pb-14">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Основные условия */}
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Гарантия на CPAP-аппараты и маски
                  </h2>
                  <p className="text-gray-600">
                    Мы предоставляем гарантию на все наши CPAP-аппараты и комплектующие:
                  </p>
                  <ul className="list-disc pl-6 text-gray-600 mt-2">
                    <li>Аппараты ResMed — 2 года</li>
                    <li>Аппараты ResVent — 1 год</li>
                    <li>Аппараты Prisma — 3 года</li>
                    <li>Маски — 3 месяца</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <AlertTriangle className="w-6 h-6 text-orange-500 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Что не покрывается гарантией
                  </h2>
                  <ul className="space-y-4 text-gray-600 list-disc pl-6">
                    <li>Повреждения от неправильного использования</li>
                    <li>Коррозия и загрязнение из-за неправильного ухода</li>
                    <li>Естественный износ деталей и фильтров</li>
                    <li>Люфт и механические повреждения вследствие эксплуатации</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Процедура обслуживания */}
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <Wrench className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Сервисное обслуживание
                  </h2>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      <strong>Бесплатные услуги:</strong> диагностика, чистка, замена фильтров
                    </p>
                    <p>
                      <strong>Сроки:</strong> Обслуживание без ограничений по времени
                    </p>
                    <p className="text-sm text-blue-600">
                      *Оплачивается только доставка при необходимости
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <Package className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Порядок обращения
                  </h2>
                  <ol className="space-y-4 text-gray-600 list-decimal pl-6">
                    <li>Отправьте фото повреждения на 
                      <a href="mailto:fluttrium@gmail.com" className="text-blue-600 hover:underline ml-1">
                        fluttrium@gmail.com
                      </a>
                    </li>
                    <li>Дождитесь предварительной оценки</li>
                    <li>Отправьте аппарат в сервисный центр</li>
                    <li>Получите заключение специалистов</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Контакты сервисного центра
                  </h2>
                  <div className="space-y-2 text-gray-600">
                    <p>Эл. почта: 
                      <a href="mailto:service@fluttrium.ru" className="text-blue-600 hover:underline ml-1">
                        service@fluttrium.ru
                      </a>
                    </p>
                    <p>Телефон: 
                      <a href="tel:+79210112794" className="text-blue-600 hover:underline ml-1">
                        +7 (921) 011-27-94
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Работаем: ежедневно с 10:00 до 20:00
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
