import Calendardash from "@/components/admincomps/calendar/calendar";
import {useCalendarPageStateStore} from "@/components/admincomps/calendar/store/_calendarPageStore";
import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import * as React from "react";
import ConsulSetting from "@/components/admincomps/calendar/consulsetting";

export default function CalendarMainPage() {
    const {currentSection, setCurrentSection} = useCalendarPageStateStore((state) => ({
        currentSection: state.currentSection,
        setCurrentSection: state.setCurrentSection,
    }));

    const renderSection = (section: string) => {
        switch (section) {
            case "default":
                return (
                    <motion.div className='flex w-full h-screen justify-center items-center '
                                initial={{opacity: 0, y: 50}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.5, ease: "easeOut"}}
                    >
                        <div className="text-7xl p-5  absolute top-0 left-10 ">Календарь</div>

                        <div className='flex felx-row h-1/2 w-full gap-3'>
                            <div
                                className='flex basis-1/2 bg-neutral-200 rounded-3xl p-5 justify-center items-center  '>
                                <div className='flex flex-col '>
                                    <div className='text-2xl font-extrabold'>Просмотр записей</div>
                                    <Button onClick={() => setCurrentSection("ordermanage")}>Manage</Button></div>
                            </div>
                            <div className='flex basis-1/2 bg-neutral-200 rounded-3xl p-5 justify-center items-center'>
                                <div className='flex flex-col '>
                                    <div className="text-2xl font-extrabold">Настройки календаря врача</div>
                                    <Button onClick={() => setCurrentSection("consulsetting")}>Settings</Button>
                                </div>
                            </div>
                        </div>


                    </motion.div>
                );
            case "ordermanage":
                return <Calendardash/>;
            case "consulsetting":
                return <ConsulSetting/>;
            default:
                return <div>Unknown section</div>;
        }
    };

    return <div>{renderSection(currentSection)}</div>;
}