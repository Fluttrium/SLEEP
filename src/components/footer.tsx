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
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl max-h-[80vh] overflow-y-auto">
      <button 
        onClick={() => setIsOfferModalOpen(false)} 
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-bold mb-4">Договор публичной оферты</h2>
      <div className="text-sm text-gray-700 space-y-4">
        <p>
          <strong>ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</strong>
          <br />
          1.1. Публичная оферта (далее – «Оферта») – публичное предложение Исполнителя, адресованное неопределенному кругу лиц, заключить с Исполнителем договор на оказание услуг (далее – «Договор») на условиях, содержащихся в настоящей Оферте, включая все Приложения.
        </p>
        <p>
          1.2. Исполнитель – самозанятый гражданин, зарегистрированный в соответствии с законодательством Российской Федерации, осуществляющий деятельность без образования юридического лица.
          <br />
          Исполнитель: Бочкарев Михаил Викторович
          <br />
          ИНН: 7710140679
          <br />
          Контактный телефон: +7 (981) 700-3974
          <br />
          Электронная почта: mikhail.bochkarev82@gmail.com
        </p>
        <p>
          1.3. Заказчик – любое физическое или юридическое лицо, заключившее с Исполнителем Договор на условиях настоящей Оферты.
        </p>
        <p>
          1.4. Услуги – перечень работ или услуг, предоставляемых Исполнителем Заказчику, описание которых размещено на сайте Исполнителя или согласовано сторонами дополнительно.
        </p>
        <p>
          1.5. Акцепт Оферты – полное и безоговорочное принятие Заказчиком условий настоящей Оферты путем совершения действий, указанных в разделе 2 настоящей Оферты.
        </p>

        <p>
          <strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong>
          <br />
          2.1. Акцептом Оферты считается совершение Заказчиком любого из следующих действий:
          <br />
          - оформление заказа на услуги через сайт Исполнителя или по электронной почте;
          <br />
          - оплата услуг Исполнителя;
          <br />
          - использование услуг Исполнителя.
        </p>
        <p>
          2.2. Акцепт Оферты означает, что Заказчик ознакомлен и согласен со всеми условиями настоящей Оферты.
        </p>
        <p>
          2.3. Исполнитель оставляет за собой право вносить изменения в условия Оферты без предварительного уведомления Заказчика. Новая редакция Оферты вступает в силу с момента ее размещения на сайте Исполнителя или направления Заказчику по электронной почте.
        </p>
        <p>
          2.4. Исполнитель предоставляет Заказчику полную и достоверную информацию об услугах, включая их стоимость, сроки выполнения и порядок оказания.
        </p>
        <p>
          2.5. В своей деятельности Исполнитель руководствуется положениями Гражданского кодекса Российской Федерации, Налогового кодекса Российской Федерации и иным действующим законодательством Российской Федерации.
        </p>

        <p>
          <strong>СТОИМОСТЬ УСЛУГ И ПОРЯДОК ОПЛАТЫ</strong>
          <br />
          3.1. Стоимость услуг определяется Исполнителем и указывается на сайте или согласовывается с Заказчиком дополнительно.
        </p>
        <p>
          3.2. Оплата услуг производится Заказчиком в порядке и на условиях, указанных Исполнителем.
        </p>
        <p>
          3.3. Обязательства Заказчика по оплате услуг считаются исполненными с момента поступления денежных средств на счет Исполнителя.
        </p>
        <p>
          3.4. Исполнитель вправе изменить стоимость услуг в одностороннем порядке. Новая стоимость услуг применяется к заказам, оформленным после изменения цены.
        </p>

        <p>
          <strong>ПОРЯДОК ОКАЗАНИЯ УСЛУГ</strong>
          <br />
          4.1. Заказ услуг осуществляется Заказчиком путем оформления заявки через сайт Исполнителя, по электронной почте или по телефону.
        </p>
        <p>
          4.2. Заказчик обязан предоставить Исполнителю всю необходимую информацию для выполнения заказа.
        </p>
        <p>
          4.3. Исполнитель приступает к выполнению заказа после его подтверждения Заказчиком и поступления оплаты (если иное не согласовано сторонами).
        </p>
        <p>
          4.4. Сроки выполнения услуг указываются в заказе или согласовываются сторонами дополнительно.
        </p>
        <p>
          4.5. Исполнитель вправе привлекать третьих лиц для выполнения своих обязательств по настоящему Договору.
        </p>

        <p>
          <strong>ОТВЕТСТВЕННОСТЬ СТОРОН</strong>
          <br />
          5.1. Исполнитель несет ответственность за качество предоставляемых услуг в соответствии с действующим законодательством Российской Федерации.
        </p>
        <p>
          5.2. Заказчик несет ответственность за достоверность предоставленной информации, необходимой для выполнения заказа.
        </p>
        <p>
          5.3. В случае неисполнения или ненадлежащего исполнения обязательств по настоящему Договору стороны несут ответственность в соответствии с действующим законодательством Российской Федерации.
        </p>

        <p>
          <strong>ФОРС-МАЖОР</strong>
          <br />
          6.1. Стороны освобождаются от ответственности за неисполнение или ненадлежащее исполнение обязательств по Договору в случае наступления обстоятельств непреодолимой силы (форс-мажор), таких как стихийные бедствия, военные действия, запретительные меры государственных органов и т.п.
        </p>
        <p>
          6.2. Сторона, для которой создалась невозможность исполнения обязательств, обязана уведомить другую сторону о наступлении форс-мажорных обстоятельств в течение 5 (пяти) рабочих дней.
        </p>

        <p>
          <strong>КОНФИДЕНЦИАЛЬНОСТЬ</strong>
          <br />
          7.1. Стороны обязуются сохранять конфиденциальность информации, полученной в ходе исполнения настоящего Договора.
        </p>
        <p>
          7.2. Исполнитель вправе использовать персональные данные Заказчика исключительно для целей исполнения настоящего Договора.
        </p>

        <p>
          <strong>РЕКВИЗИТЫ ИСПОЛНИТЕЛЯ</strong>
          <br />
          Исполнитель: Бочкарев Михаил Викторович
          <br />
          ИНН: 7710140679
          <br />
          Контактный телефон: +7 (981) 700-3974
          <br />
          Электронная почта: mikhail.bochkarev82@gmail.com
        </p>

        <p>
          <strong>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</strong>
          <br />
          8.1. Настоящая Оферта вступает в силу с момента ее размещения на сайте Исполнителя и действует до момента отзыва Оферты Исполнителем.
        </p>
        <p>
          8.2. Все споры и разногласия, возникающие между сторонами, разрешаются путем переговоров. В случае невозможности достижения соглашения спор передается на рассмотрение в суд по месту нахождения Исполнителя.
        </p>
        <p>
          8.3. Во всем, что не предусмотрено настоящей Офертой, стороны руководствуются действующим законодательством Российской Федерации.
        </p>
      </div>
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
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
      <button 
        onClick={() => setIsModalOpen(false)} 
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-center">Пользовательское соглашение</h2>
      
      <div className="space-y-4 text-sm text-gray-700">
        {/* Пункт 1 */}
        <div>
          <h3 className="font-semibold">1. Общие положения</h3>
          <p>1.1 Настоящее Соглашение заключено между Бочкаревым Михаилом Викторовичем (ИНН 7710140679, КПП 771301001), 
          далее именуемым «Владелец», и любым лицом, принимающим условия настоящего соглашения, 
          далее именуемым «Пользователь», при использовании сайта www.asleep.online.</p>
          <p>1.2. Использование сайта означает полное согласие Пользователя с условиями настоящего Соглашения.</p>
          <p>1.3. Владелец оставляет за собой право вносить изменения в Соглашение без предварительного уведомления Пользователя.</p>
        </div>

        {/* Пункт 2 */}
        <div>
          <h3 className="font-semibold">2. Права и обязанности сторон</h3>
          <p>2.1. Владелец обязуется:</p>
          <ul className="list-disc pl-6">
            <li>Обеспечивать работу сайта в соответствии с его функциональным назначением.</li>
            <li>Защищать персональные данные Пользователей.</li>
          </ul>
          <p>2.2. Пользователь обязуется:</p>
          <ul className="list-disc pl-6">
            <li>Не использовать сайт для противоправных действий.</li>
            <li>Соблюдать условия настоящего Соглашения.</li>
          </ul>
        </div>

        {/* Пункт 3 */}
        <div>
          <h3 className="font-semibold">3. Конфиденциальность</h3>
          <p>3.1. Владелец обязуется не передавать персональные данные Пользователя третьим лицам без его согласия, за исключением случаев, предусмотренных законодательством.</p>
          <p>3.2. Пользователь соглашается на обработку своих персональных данных в соответствии с Политикой конфиденциальности.</p>
        </div>

        {/* Пункт 4 */}
        <div>
          <h3 className="font-semibold">4. Ограничения ответственности</h3>
          <p>4.1. Владелец не несет ответственности за:</p>
          <ul className="list-disc pl-6">
            <li>Убытки, возникшие в результате использования или невозможности использования сайта.</li>
            <li>Действия третьих лиц, включая взлом сайта.</li>
          </ul>
        </div>

        {/* Пункт 5 */}
        <div>
          <h3 className="font-semibold">5. Заключительные положения</h3>
          <p>5.1. Настоящее Соглашение вступает в силу с момента его принятия Пользователем.</p>
          <p>5.2. Все споры разрешаются в соответствии с законодательством Российской Федерации.</p>
          <p>5.3. В случае недействительности какого-либо положения Соглашения, остальные положения остаются в силе.</p>
        </div>

        {/* Дата обновления */}
        <div className="mt-6 border-t pt-4">
          <p className="text-xs text-gray-500">
            Дата последнего обновления: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
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