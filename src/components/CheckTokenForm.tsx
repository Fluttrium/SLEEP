"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation"; // Импортируем useSearchParams
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

export function CheckTokenForm() {
    const [value, setValue] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            setError(null); // Сбрасываем ошибку перед запросом

            const res = await fetch("/api/verify-token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: value }), // Отправляем введенный токен и email
            });

            if (!res.ok) {
                const { error } = await res.json();
                throw new Error(error || "Ошибка верификации");
            }

            const data = await res.json();
            setSuccess(data.message); // Выводим сообщение об успешной верификации
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="space-y-2">
            <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>

            <div className="text-center text-sm">
                {value === "" ? (
                    <>Enter your one-time password.</>
                ) : (
                    <>You entered: {value}</>
                )}
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
                className="btn-primary"
                disabled={value.length !== 6}
                onClick={handleSubmit}
            >
                Verify Token
            </button>
        </div>
    );
}
