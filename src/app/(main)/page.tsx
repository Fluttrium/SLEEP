"use client"
import {NewsGroupList} from "@/components/shared/news-grouplist";
import {TopBar} from "@/components/shared/top-bar";
import {Hero} from "@/components/shared/hero";
import React from "react";
import Steps from "@/components/shared/steps";
import {Container} from "@/components/shared/ui/container";
import {SleepStats} from "@/components/shared/ui/blocks";
import {GlareCard} from "@/components/ui/glare-card";
import TeamCard from "@/components/shared/team";
import Information from "@/components/shared/information";
import Footer from "@/components/footer";
import {BentoGrid} from "@/components/ui/bento-grid";
import {BentoGridDemo} from "@/components/ui/bento-gridDemo";
import {FeaturesSectionDemo} from "@/components/ui/services";
import {Article} from "@/components/shared/ui/article";



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
                <div id="Услуги">
                    <FeaturesSectionDemo/>
                    </div>

                    {/* Проблемы со сном */}
                <div id="Нарушение сна">
                <SleepStats/>
                </div>

                {/* Статьи */}
                <div id="Статьи">
                    <Article/>
                </div>

               
                <div id='Как мы можем помочь вам'>
                    <Steps/>
                </div>
                    <div id="Команда">
                    <TeamCard/>
                    </div>
                   
                    <Information/>
                    <Footer/>
            </div>
        </>
    );
}
