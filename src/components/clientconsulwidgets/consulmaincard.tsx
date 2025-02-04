import {ConsulProduct} from "@prisma/client";

interface ConsulmainCardProps{
    consul: ConsulProduct
}

export default function ConsulmainCard( consulprop: ConsulmainCardProps) {
    return (
        <div>
            <div>{consulprop.consul.id}</div>
            <div>{consulprop.consul.title}</div>
            <div>{consulprop.consul.description}</div>
            <div>{consulprop.consul.price}</div>
            <div>{consulprop.consul.image}</div>
        </div>
    )
}