import {Chart1} from "@/components/admincomps/chart1";
import {TabsDemo} from "@/components/admincomps/admintabs";

export default function Requests() {
    return (
        <section className=" h-screen">
            <div className='text-7xl ps-5'>Личный кабинет</div>
            <div className="h-max flex  items-center ">
                <div className="flex flex-row space-x-20  w-full pt-12  px-4 ">
                    <div className=" w-1/2"><Chart1/></div>
                    <div className=" w-1/2"><TabsDemo/></div>

                </div>
            </div>

        </section>
    );
}