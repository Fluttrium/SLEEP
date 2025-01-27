import {ConsulProduct} from "@prisma/client";

interface DocconsulCompProps {
    consul: ConsulProduct;
}

const mocs: ConsulProduct[] = [
    {
        id: 1,
        title: "Консультация терапевта",
        description: "Полная консультация с разбором анализов.",
        price: 1500,
        doctorID: "id1",
        image: "https://example.com/image1.jpg",
    },
    {
        id: 2,
        title: "Консультация педиатра",
        description: "Осмотр ребёнка и рекомендации.",
        price: 2000,
        doctorID: "id2",
        image: "https://example.com/image2.jpg",
    },
];

export default function DocconsulComp({consul}: DocconsulCompProps): JSX.Element {
    return (
        <div className="rounded-3xl shadow-lg border p-4 flex flex-row items-center">
            <div className="flex flex-col ">
                <h1 className="text-xl font-bold mb-2">{consul.title}</h1>
                <p className="mb-2">{consul.description}</p>
                <p className="font-semibold mb-4">Цена: {consul.price} руб.</p>
            </div>
            <img
                src={consul.image!}
                alt={consul.title!}
                className=" max-w-[100px] rounded-lg"
            />
        </div>
    );
}
