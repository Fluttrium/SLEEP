// app/signin/page.tsx
"use client"; // Эта строка должна быть первой



import {LoginForm} from "@/components/LoginForm";

export default function SignInPage() {
    return (
        <div className='flex  items-center justify-center h-screen'>

            <LoginForm />
        </div>
    );
}
