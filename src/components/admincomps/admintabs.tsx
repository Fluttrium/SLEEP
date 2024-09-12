import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Аккаунт</TabsTrigger>
                <TabsTrigger value="password">Пароль</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <Card>
                    <CardHeader>
                        <CardTitle>Аккаунт</CardTitle>
                        <CardDescription>
                            Измените данные своего аккаунта. Для подтверждения нажмите кнопку готово.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="name">Имя</Label>
                            <Input id="name" defaultValue="Василий Васильевич" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="username">Никнейм</Label>
                            <Input id="username" defaultValue="@vasya" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Готово</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="password">
                <Card>
                    <CardHeader>
                        <CardTitle>Пароль</CardTitle>
                        <CardDescription>
                            Измените пароль здесь. После изменения пароля вы выйдете из аккаунта.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Label htmlFor="current">Текущий пароль</Label>
                            <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="new">Новый пароль</Label>
                            <Input id="new" type="password" />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Изменить пароль</Button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
