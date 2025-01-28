import { Button } from "@/components/ui/button";
import * as React from "react";
import { useCalendarPageStateStore } from "@/components/admincomps/calendar/store/_calendarPageStore";
import { fetchAllDoctorProduct, fetchAllDoctors } from "@/components/admincomps/calendar/handlers";
import { useEffect, useState } from "react";
import { ConsulProduct, User } from "@prisma/client";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DocconsulComp from "@/components/admincomps/calendar/doctorsconsulcomponents/docconsulcomp";

const validationMessages = {
    title: "Title must be at least 2 characters.",
    description: "Description must be at least 2 characters.",
    doctor: "Doctor must be selected.",
};

const formSchema = z.object({
    title: z.string().min(2, { message: validationMessages.title }),
    description: z.string().min(2, { message: validationMessages.description }),
    price: z.coerce.number().min(0, {
        message: "Price must be a positive number.",
    }),
    doctorId: z.string().min(1, { message: validationMessages.doctor }),
    image: z.instanceof(File).optional(),
});

export default function QConsulSetting() {
    const [doctorsProducts, setDoctorsProducts] = useState<ConsulProduct[]>([]);
    const [doctors, setDoctors] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [chosendoctor, setChosendoctor] = useState<User | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            doctorId: "",
            image: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("price", values.price.toString());
        formData.append("doctorId", values.doctorId);
        if (values.image) {
            formData.append("image", values.image);
        }

        try {
            const response = await fetch("/api/admin/calendar/docproduct", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Success:", result);
                alert("Doctor's service successfully added!");
                form.reset();
                await fetchData(); // Обновление данных
            } else {
                console.error("Error:", response.statusText);
                alert("Failed to add doctor's service.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        }
    }

    const { currentSection, setCurrentSection } = useCalendarPageStateStore((state) => ({
        currentSection: state.currentSection,
        setCurrentSection: state.setCurrentSection,
    }));

    const fetchData = async () => {
        try {
            const [doctorProductList, doctorsList] = await Promise.all([fetchAllDoctorProduct(), fetchAllDoctors()]);
            setDoctors(doctorsList);
            setDoctorsProducts(doctorProductList);
        } catch (err) {
            console.error("Error loading data:", err);
            setError("Failed to load data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDoctorSelect = (doctor: User) => {
        setChosendoctor(doctor);
        form.setValue("doctorId", doctor.id);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <Dialog>
                <DialogTrigger>
                    <Button className="absolute bottom-0 right-0 m-5">
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Add Doctor's Consultation Service</DialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Doctor's consultation" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Description of the consultation" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Цена</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="1000" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input type="file" onChange={(e) => form.setValue("image", e.target.files?.[0])} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button>
                                            {chosendoctor?.name ? `${chosendoctor.name} ${chosendoctor.surname}` : "Select a doctor"}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {error ? (
                                            <div className="text-red-500">{error}</div>
                                        ) : (
                                            <div>
                                                {doctors.map((doctor) => (
                                                    <div
                                                        key={doctor.id}
                                                        onClick={() => handleDoctorSelect(doctor)}
                                                        className="p-2 border-b hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {doctor.name} {doctor.surname}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <Button onClick={() => setCurrentSection("default")}>Settings Page Placeholder</Button>

            {doctorsProducts.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                    {doctorsProducts.map((docprod) => (
                        <DocconsulComp key={docprod.id} consul={docprod} />
                    ))}
                </div>
            ) : (
                <div>{error || "Loading data..."}</div>
            )}
        </div>
    );
}
