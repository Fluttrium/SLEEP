// app/signin/page.tsx
"use client"; // Эта строка должна быть первой



import SleepApneaInfo from "@/components/apneacards";
import Footer from "@/components/footer";
import {LoginForm} from "@/components/LoginForm";
import { Hero } from "@/components/shared/hero";
import Information from "@/components/shared/information";
import Steps from "@/components/shared/steps";

export default function SignInPage() {
    return (
        <div className='bg-cover bg-center min-h-screen'>

            <Hero/>
            <SleepApneaInfo/>
            <Steps/>
            <Information/>
            <Footer/>
        </div>
    );
}
