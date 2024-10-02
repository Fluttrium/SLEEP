import React, {useState} from "react";
import {Button} from "@/components/ui/button";

interface TestRedactorProps {
    onClose: () => void;
    id: any
}

export function TestRedactor({onClose, id}: TestRedactorProps) {


    return (
        <div className="">
            <h2 className="text-2xl mb-4">Редактор теста{id}</h2>
            <div className="flex justify-end">


                <Button onClick={onClose} >Закрыть</Button>
            </div>

        </div>
    );
}

