import { Chart1 } from "@/components/admincomps/chart1";
import { TabsDemo } from "@/components/admincomps/admintabs";
import { motion } from "framer-motion"

export default function Requests() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full px-5"
        >
            <section className=" h-screen">
                <div className='text-7xl ps-5'>Личный кабинет</div>
                <div className="h-max flex  items-center ">
                    <div className="flex flex-row space-x-20  w-full pt-12  px-4 ">
                        <div className=" w-1/2"><Chart1 /></div>
                        <div className=" w-1/2 h-max flex"><TabsDemo /></div>

                    </div>
                </div>

            </section>
        </motion.div>
    );
}