"use client";
import { Clock, Mail, Phone, Building, Handshake } from "lucide-react";
import { Title } from "../../../shared/components/shared/title";
import { Container } from "../../../shared/components/shared/container";

export default function Contacts() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="pt-10">
        <Title 
          text="Контакты" 
          size="lg" 
          className="font-extrabold text-3xl text-gray-900 mb-4"
        />
      </Container>

      <Container className="mt-8 pb-14">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Левая колонка */}
          <div className="space-y-8">
            {/* Блок реквизитов */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <Building className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Бочкарев Михаил Викторович
                  </h3>
                  <div className="space-y-1 text-gray-600 text-sm">
                    <p>ИНН: 7710140679</p>
                    <p>КПП: 771301001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Режим работы */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Режим работы
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div>Понедельник - Пятница</div>
                    <div className="text-right">10:00 - 19:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="space-y-8">
            {/* Контактная информация */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="space-y-6">
                {/* Телефон */}
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Телефон
                    </h3>
                    <a 
                      href="tel:+789210112794" 
                      className="text-blue-600 hover:text-blue-800 transition-colors text-lg"
                    >
                      +7 (981) 700 3974
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Электронная почта
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <a 
                          href="mailto:info@daggerrknives.ru" 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          mikhail.bochkarev82@gmail.com
                        </a>
                        <p className="text-sm text-gray-500 mt-1">По всем вопросам</p>
                      </div>
                      <div>
                        <a 
                          href="mailto:fluttrium@gmail.com" 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          mikhail.bochkarev82@gmail.com
                        </a>
                        <p className="text-sm text-gray-500 mt-1">Сервисное обслуживание</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Сотрудничество */}
                <div className="flex items-start gap-4">
                  <Handshake className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Сотрудничество
                    </h3>
                    <div className="space-y-2">
                      <a 
                        href="mailto:partner@fluttrium.ru" 
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        mikhail.bochkarev82@gmail.com
                      </a>
                      <p className="text-sm text-gray-500 mt-1">Дилерские программы</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}