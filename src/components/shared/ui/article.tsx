import React from 'react';
import { NewsGroupList } from '../news-grouplist';
import Image from "next/image";

export const Article: React.FC = () => {
  return (
      <div className=" relative text-center  px-4 sm:px-6 lg:px-8">
          <div className='absolute right-0 top-0 -rotate-180 -z-50'>
              <Image src="/hero1.svg" alt="Icon" width={300} height={300} style={{height: '100%'}}/>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
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
                              id: 3,
                              title: "Сон и его влияние на здоровье",
                              imageUrl: "https://medportal.ru/pictures/article/c9c96a0b-53f2-409d-93a5-0c227b9a88b3/medium.jpg",
                              body: "Как хороший сон влияет на общее состояние здоровья."
                          },
                          {
                              id: 4,
                              title: "Методы борьбы с бессонницей",
                              imageUrl: "https://medportal.ru/pictures/article/c9c96a0b-53f2-409d-93a5-0c227b9a88b3/medium.jpg",
                              body: "Эффективные методы для улучшения качества сна."
                          }
                      ]}
                      categoryId={0}
                  />
              </div>
          </div>
      </div>
  );
};
