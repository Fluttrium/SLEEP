import {Button} from "@/components/ui/button";
import * as React from "react";
import {useCalendarPageStateStore} from "@/components/admincomps/calendar/store/_calendarPageStore";
import {fetchAllDoctorProduct, fetchAllDoctors} from "@/components/admincomps/calendar/handlers";
import {useEffect, useState} from "react";
import {ConsulProduct, User} from "@prisma/client";
import {Plus} from "lucide-react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import DatePicker, {DateObject} from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {Calendar} from "@/components/ui/calendar";
import DocconsulComp from "@/components/admincomps/calendar/doctorsconsulcomponents/docconsulcomp";
import {description} from "@/components/admincomps/chart1";


const format = "MM/DD/YYYY";


const formSchema = z.object({
    description: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    doctorId: z.string().min(1, {
        message: "Doctor must be selected.",
    }),
    image: z.instanceof(File).optional(),
})


export default function qConsulSetting() {
    const [dates, setDates] = useState<DateObject[]>([
        new DateObject().set({day: 4, format}),
        new DateObject().set({day: 25, format}),
        new DateObject().set({day: 20, format})
    ]);
    const [doctorsProducts, setDoctorsProducts] = useState([]);
    const [doctors, setDoctors] = useState([]); // Состояние для хранения списка докторов
    const [error, setError] = useState<string | null>(null);
    const [chosendoctor, setChosendoctor] = useState<User>();
    const [image, setImage] = useState<File | null>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            doctorId: "",
            image: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('description', values.description);
        formData.append('doctorId', values.doctorId);
        if (image) {
            formData.append('image', image);  // добавляем изображение
        }

        try {
            const response = await fetch("/api/admin/calendar/docproduct", {
                method: "POST",
                body: formData,  // Передаем форму с файлами
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Успешно отправлено:", result);
                alert("Доктор предоставляющий услуги успешно добавлен!");
                form.reset();
                document.dispatchEvent(new MouseEvent("mousedown", {bubbles: true})); // Закрыть диалог
            } else {
                console.error("Ошибка при отправке:", response.statusText);
                alert("Произошла ошибка при добавлении доктора.");
            }
        } catch (error) {
            console.error("Ошибка при отправке:", error);
            alert("Произошла ошибка. Попробуйте позже.");
        }
    }

    const {currentSection, setCurrentSection} = useCalendarPageStateStore((state) => ({
        currentSection: state.currentSection,
        setCurrentSection: state.setCurrentSection,
    }));
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorProductList = await fetchAllDoctorProduct();
                const doctorsList = await fetchAllDoctors();
                setDoctors(doctorsList);
                setDoctorsProducts(doctorProductList);
            } catch (err) {
                console.error("Ошибка при загрузке списка докторов:", err);
                setError("Ошибка при загрузке данных");
            }
        };

        fetchDoctors();
    }, []); // Пустой массив зависимостей для вызова эффекта только один раз

    // Функция для обновления выбранного доктора
    const handleDoctorSelect = (doctor: User) => {
        setChosendoctor(doctor);
        form.setValue("doctorId", doctor.id); // Устанавливаем doctorId в форму
    };

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
        form.setValue("image", file!); // Устанавливаем изображение в форму
    };
    return (
        <div className="flex flex-col w-full h-full ">
            <Dialog>
                <DialogTrigger>
                    <Button className='absolute bottom-0 right-0 m-5'><Plus/></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Добавление доктора который предоставляет услуги консультации</DialogTitle>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Описание консультации</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Консультация доктора сомнолога" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Изображение</FormLabel>
                                        <FormControl>
                                            <Input type="file" onChange={handleImageSelect}/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className='flex flex-col gap-3'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button>
                                            {chosendoctor && chosendoctor.name && chosendoctor.surname
                                                ? `${chosendoctor.name} ${chosendoctor.surname}`
                                                : "Доктор не выбран"}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {error && <div className="text-red-500">{error}</div>}
                                        <div className="mt-4">
                                            {doctors.length > 0 ? (
                                                <div>
                                                    {doctors.map((doctor: User, index) => (
                                                        <div
                                                            onClick={() => handleDoctorSelect(doctor)}
                                                            key={doctor.id || index}
                                                            className="p-2 border-b gap-3"
                                                        >
                                                            {doctor.name} {doctor.surname}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                !error && <div>Загрузка данных...</div>
                                            )}
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Button type="submit">Создать</Button>
                            </div>

                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            <Button onClick={() => setCurrentSection("default")}>Settings Page Placeholder</Button>
            <div className="App">

                <div style={{textAlign: "center"}}>
                    <DatePicker
                        value={dates}
                        onChange={setDates}
                        multiple
                        sort
                        format={format}
                        calendarPosition="bottom-center"
                        plugins={[<DatePanel/>]}
                    />
                </div>
                <ul>
                    {dates.map((date, index) => (
                        <li key={index}>{date.format()}</li>
                    ))}
                </ul>
            </div>
            {doctorsProducts.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {doctorsProducts.map((docprod: ConsulProduct) => (
                        <DocconsulComp key={docprod.id} consul={docprod}/>
                    ))}
                    {doctorsProducts.map((docprod: ConsulProduct) => (
                        <DocconsulComp key={docprod.id} consul={docprod}/>
                    ))}
                </div>
            ) : (
                !error && <div>Загрузка данных...</div>
            )}
        </div>
    );
}
