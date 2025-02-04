import CalendarWidget from "@/components/clientconsulwidgets/CalendarWidget";

export default function ConsulPage({ params }: { params: { doctorID: string } }) {
    return (
        <div className="container mx-auto p-8">
            <CalendarWidget doctorId={params.doctorID} />
        </div>
    );
}