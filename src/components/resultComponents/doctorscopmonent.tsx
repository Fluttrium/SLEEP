import Image from "next/image";
import Doctorform from "@/components/doctorform";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function DoctorsComponent() {
    const [carouselRef, api] = useEmblaCarousel({loop: true});
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

    React.useEffect(() => {
        if (!api) return;

        setScrollSnaps(api.scrollSnapList());

        const onSelect = () => {
            setSelectedIndex(api.selectedScrollSnap());
        };

        api.on("select", onSelect);
        onSelect();

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    const scrollTo = (index: number) => {
        api?.scrollTo(index);
    };

    const doctors = Array.from({length: 5}, (_, index) => ({
        id: index,
        name: "Карина Залупкина",
        specialization: "Врач жополог с ахуенным стажем",
        image: "/budkofaja.jpeg",
    }));

    return (
        <div className="h-1/3 bg-white rounded-3xl flex flex-col shadow">
            {/* Карусель */}
            <div ref={carouselRef} className="overflow-hidden">
                <div className="flex">
                    {doctors.map((doctor, index) => (
                        <div
                            key={doctor.id}
                            className="flex-shrink-0 min-w-full p-4 flex items-center justify-center"
                        >
                            <div className="p-1 flex flex-row items-center justify-center m-3">
                                <Image
                                    className="w-1/4 h-[90%] rounded-3xl"
                                    src={doctor.image}
                                    alt={`Фото доктора ${doctor.name}`}
                                    width={100}
                                    height={200}
                                />
                                <div className="flex flex-col gap-3 ml-5">
                                    <div className="font-bold">{doctor.name}</div>
                                    <div className="font-semibold">{doctor.specialization}</div>
                                    <Doctorform/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Индикаторы */}
            <div className="flex justify-center gap-2 -mt-5 z-50">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === selectedIndex ? "bg-blue-500" : "bg-gray-400"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
