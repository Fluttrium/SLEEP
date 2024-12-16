"use client";
import {useSession, signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {TestChart} from "@/components/ui/chart2";

export function UserProfile() {
    const {data: session} = useSession();

    return (
        <div className="flex flex-row w-screen h-full justify-between px-10 py-11">
            <div className='flex flex-col mx-3'>
                <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Аккаунт</TabsTrigger>
                    <TabsTrigger value="password">Пароль</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Аккаунт</CardTitle>
                            <CardDescription>
                                Внесите изменения в свой аккаунт здесь. Нажмите &quot;Сохранить&quot;, когда закончите.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Имя</Label>
                                <Input id="name" defaultValue=""/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Имя пользователя</Label>
                                <Input id="username" defaultValue=""/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Сохранить изменения</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Пароль</CardTitle>
                            <CardDescription>
                                Измените свой пароль здесь. После сохранения вы будете выведены из
                                системы.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">Текущий пароль</Label>
                                <Input id="current" type="password"/>
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">Новый пароль</Label>
                                <Input id="new" type="password"/>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Сохранить пароль</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
                <div className='mt-8 w-full h-8 bg-red-600 rounded-3xl flex items-center justify-center text-stone-50 font-semibold'
                     onClick={() => signOut({ callbackUrl: "/" })}>
                    Выйти из аккаунта
                </div>
            </div>

            {session?.user?.id && <TestChart userId={session.user.id}/>}
        </div>
    );
}
