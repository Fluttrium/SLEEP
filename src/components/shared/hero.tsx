import React from "react";
import Image from 'next/image';


interface Props {
    className?: string;
}

export const Hero: React.FC<Props> = ({className}) => {
    return (
        <section className='flex justify-center items-top' style={{height: '85vh', position: 'relative'}}>
            <div className='absolute right-0 bottom-0 -rotate-90 -z-50'>
                <Image src="/hero1.svg" alt="Icon" width={300} height={300} style={{height: '100%'}}/>
            </div>
            <div className='flex flex-col space-y-10 items-center justify-center mx-20 gap-1.5 my-6'>
                <div style={{fontWeight: 600}}
                     className=' text- popover-foreground text-center text-8xl leading-[7rem]'>Пройдите тест и мы
                    поможем решить ваши проблемы со сном
                </div>
                <button className="p-[6px] relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-primary rounded-[64px]"/>
                    <div
                        style={{fontWeight: 600}}
                        className="px-[128px] py-10 bg-white rounded-[64px] text-4xl relative group transition duration-200 text-black hover:bg-transparent">
                        Пройти тест
                    </div>
                </button>
            </div>


        </section>
    )
}