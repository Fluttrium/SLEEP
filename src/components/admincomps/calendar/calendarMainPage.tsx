import {motion} from "framer-motion";
import * as React from "react";
import ConsulSetting from "@/components/admincomps/calendar/consulsetting";

export default function CalendarMainPage() {


    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1.5, ease: "easeOut"}}
            className="w-full h-screen px-5"
        >
            <section className="relative ps-5 h-full flex flex-col">
                <div className='flex text-7xl mb-4'>Создание консультаций</div>
                <div className='mt-11'><ConsulSetting/></div>
            </section>


        </motion.div>
    );


}