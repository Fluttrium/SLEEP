import {motion} from "framer-motion";
import * as React from "react";
import {Calendar} from "@/components/ui/calendar";
import HoursTable from "@/components/admincomps/calendar/hourstable";
import {fetchAllDoctors, searchbydate} from "@/components/admincomps/calendar/handlers";
import {consulOrder, User} from "@prisma/client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import CalendarMainPage from "@/components/admincomps/calendar/calendarMainPage";
import {useCalendarPageStateStore} from "@/components/admincomps/calendar/store/_calendarPageStore";


export default function Calendardash() {

    const {currentSection, setCurrentSection} = useCalendarPageStateStore((state) => ({
        currentSection: state.currentSection,
        setCurrentSection: state.setCurrentSection,
    }));
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [consulOrder, setConsul] = React.useState<consulOrder[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [docforcalendar, setDocforcalendar] = React.useState<String >('Общий календарь');
    const [doctorsList, setDoctorsList] = React.useState<User[]>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctors = await fetchAllDoctors();
                setDoctorsList(doctors);
            } catch (error) {
                console.error("Ошибка при загрузке списка докторов:", error);
            }
        };

        fetchDoctors();
    }, []);

    const formatToYYYYMMDD = (date: Date): number => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Добавляем 1, так как getMonth() возвращает 0-11
        const day = date.getDate().toString().padStart(2, "0");
        return parseInt(`${day}${month}${year}`);
    };

    const handleDateChange = async (newDate: Date | undefined) => {
        if (newDate) {
            setDate(newDate);
            const formattedDate = formatToYYYYMMDD(newDate);

            try {
                const records = await searchbydate(formattedDate, );
                setConsul(records);
                setError(null);
            } catch (err) {
                setError("Ошибка при получении записей");
                console.error(err);
            }
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className="w-full h-full px-5"
        >
            <div className="text-7xl p-5 ">Календарь</div>
            <Button onClick={() => setCurrentSection("default")}>Вернуться в календарь</Button>
            <motion.div
                initial={{opacity: 0, scale: 0.9}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5}}
                className="rounded-md"
            >

                <div className="flex flex-row w-full h-full overflow-hidden justify-between gap-2">
                    <div className="flex w-1/2 flex-col gap-5">
                        <div className="flex rounded-3xl bg-neutral-100">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={handleDateChange}
                            />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='outline'>{docforcalendar}</Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuRadioGroup  onValueChange={setDocforcalendar}>
                                        {doctorsList.map((doctor) => (
                                            <DropdownMenuRadioItem value={doctor.name!}>{doctor.name}</DropdownMenuRadioItem>
                                        ))}
                                        <DropdownMenuRadioItem value='Общий календарь'> Oбщее</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>

                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex p-5  items-center justify-center text-xl rounded-3xl bg-neutral-100">
                            <HoursTable date={date} consuls={consulOrder}/>
                        </div>
                    </div>
                    <div className="flex w-1/2 rounded-3xl h-[90%] bg-neutral-100">
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">INV001</TableCell>
                                    <TableCell>Paid</TableCell>
                                    <TableCell>Credit Card</TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                </div>
            </motion.div>
        </motion.div>
    );
}
