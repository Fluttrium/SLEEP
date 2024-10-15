import Link from "next/link";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {signIn} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/navigation";


// Обновите тип SignInResponse
interface SignInResponse {
    error?: string;

    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
    } | null; // Убедитесь, что user может быть null
}

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();


    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        }) as unknown as SignInResponse;

        if (res?.error) {
            setError(res.error); // Отображение ошибки
        } else {
            setError(''); // Сброс ошибки при успешном входе
            router.push('/');
        }
    };

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Вход</CardTitle>
                <CardDescription>
                    Введите свой email для входа в личный кабинет
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleLogin}>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Почта</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Пароль</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Забыли пароль?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <div className="text-red-500">{error}</div>} {/* Ошибка входа */}
                        <Button type="submit" className="w-full">
                            Войти
                        </Button>
                        <Link href='/'>
                            <Button variant="outline" className="w-full">
                                Войдите с помощью Яндекс
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Еще нет аккаунта?{" "}
                        <Link href="/register" className="underline">
                            Зарегистрироваться
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
