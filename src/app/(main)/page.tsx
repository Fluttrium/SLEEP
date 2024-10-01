import { SleepStats } from "@/components/shared/blocks";
import { Container } from "@/components/shared/container";
import { NewsCard } from "@/components/shared/news-card";
import { NewsGroupList } from "@/components/shared/news-grouplist";
import Steps from "@/components/shared/steps";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";
import { TimelineDemo } from "@/components/timelinecomponent";

import clsx from 'clsx';

export default function Home() {
  return (
    <>
      <div className=" bg-cover bg-center min-h-screen">

        <div className="absolute flex justify-center w-screen">
          <TopBar />
        </div>

        {/* Тест */}
        <div id="Тест" className="flex justify-center items-start mt-5 bg-[url('https://example.com/your-vector-background.svg')] bg-cover bg-center p-5 rounded-lg">
          <div className="max-w-xl">
            <ul className="space-y-4">
              <li className="flex items-center">
                <Title text="🎉 Бесплатный тест на апноэ во сне" size="xl" className="font-extrabold text-4xl" />
              </li>
              <li className="flex items-center">
                <span className={clsx("text-blue-500", "mr-2")}>✓</span>
                <Title text="😴 Устали от храпа и плохого сна?" size="xl" className="text-2xl" />
              </li>
              <li className="flex items-center">
                <span className={clsx("text-blue-500", "mr-2")}>✓</span>
                <Title text="🔍 Узнайте, страдаете ли вы от апноэ!" size="xl" className="text-2xl" />
              </li>
              <li className="flex items-center">
                <span className={clsx("text-blue-500", "mr-2")}>✓</span>
                <Title text="👨‍⚕️ Получите консультацию от наших врачей!" size="xl" className="text-2xl font-semibold" />
              </li>
            </ul>

            <button className="mt-5 px-10 py-4 bg-blue-600 text-white rounded-2xl text-xl font-semibold hover:bg-blue-700 transition-all duration-200">
              🚀 Пройти тест прямо сейчас!
            </button>
          </div>

          <div className="ml-20">
            <img
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.logopediaymas.es%2Fwp-content%2Fuploads%2F2022%2F12%2Fapnea-del-sueno.jpg&f=1&nofb=1&ipt=b6e27623c2044ec88b6f58c64810db9c13a5f162ae3a7044ff95e2a1ae9ca567&ipo=images"
              alt="Здоровый сон"
              className="rounded-[20px] object-cover"
              style={{ width: '300px', height: '400px' }}
            />
          </div>
        </div>

        {/* Статьи */}
        <div id="Статьи">
          <Container >
            <div className="flex gap-[60px]">
              <div className="flex flex-col gap-16">
                <NewsGroupList
                  title="Статьи"
                  items={[
                    {
                      id: 1,
                      title: "Апноэ во сне",
                      imageUrl: "https://www.periodistadigital.com/wp-content/uploads/2018/06/apnea-del-suen-o.jpg",
                      body: "Подробное описание статьи о нарушениях сна."
                    },
                    {
                      id: 2,
                      title: "Храп как причина плохого сна",
                      imageUrl: "https://medportal.ru/pictures/article/c9c96a0b-53f2-409d-93a5-0c227b9a88b3/medium.jpg",
                      body: "Советы по улучшению качества сна."
                    },
                    {
                      id: 3, // Исправлено id
                      title: "Храп как причина плохого сна",
                      imageUrl: "https://medportal.ru/pictures/article/c9c96a0b-53f2-409d-93a5-0c227b9a88b3/medium.",
                      body: "Советы по улучшению качества сна."
                    },
                    {
                      id: 4, // Исправлено id
                      title: "Храп как причина плохого сна",
                      imageUrl: "https://medportal.ru/pictures/article/c9c96a0b-53f2-409d-93a5-0c227b9a88b3/medium.jpg",
                      body: "Советы по улучшению качества сна."
                    }
                  ]}
                  categoryId={0}
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Проблемы со сном */}
        <div id="Проблемы со сном">
          <SleepStats />
          <Steps/>
        </div>
      </div>
    </>
  );
}
