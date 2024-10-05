import {NewsGroupList} from "@/components/shared/news-grouplist";
import {TopBar} from "@/components/shared/top-bar";
import {Hero} from "@/components/shared/hero";
import React from "react";
import Steps from "@/components/shared/steps";
import {Container} from "@/components/shared/ui/container";
import {SleepStats} from "@/components/shared/ui/blocks";
import { GlareCard } from "@/components/ui/glare-card";
import TeamCard from "@/components/shared/team";
import Information from "@/components/shared/information";
import Footer from "@/components/footer";
import { BentoGrid } from "@/components/ui/bento-grid";
import { BentoGridDemo } from "@/components/ui/bento-gridDemo";
import { FeaturesSectionDemo } from "@/components/ui/services";


export default function Home() {
    return (
        <>
            <div className=" bg-cover bg-center min-h-screen">

                <div className="absolute flex justify-center w-screen">
                    <TopBar/>
                </div>
                {/*новый выриант hero*/}
                <div id="Тест">
                    <Hero/>
                </div>

                {/* Статьи */}
                <div id="Статьи">
                    <Container>
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
                <div id="Нарущение сна">
                <SleepStats/>
                </div>
                <div id='Как мы можем помочь вам'>
                    <Steps/>
                    <FeaturesSectionDemo/>
                    <TeamCard/>
                  <Information/>
                  <Footer/>

                </div>
            </div>
        </>
    );
}
