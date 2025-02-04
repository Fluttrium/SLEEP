import Doctorslist from "@/components/clientconsulwidgets/doctorslist";

export default function DoctorPage({params}: { params: { specialityTitle: string } }) {
    return <Doctorslist specialityTitle={params.specialityTitle}/>;
}
