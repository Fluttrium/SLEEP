"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { GlareCardDemo } from "./ui/glare-cardDemo2";

// Тематический контейнер
const ThematicContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-8 rounded-lg shadow-lg border border-blue-200 dark:border-blue-700">
      {children}
    </div>
  );
};

export function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, description }),
      });

      if (response.ok) {
        setName("");
        setEmail("");
        setPhone("");
        setDescription("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThematicContainer>
      <div className="max-w-6xl h-max w-full mx-auto flex flex-col md:flex-row">
        {/* Левая часть с GlareCardDemo */}
        <div className="flex md:w-1/2 mb-4 md:mb-0 md:pr-4 items-center justify-center">
          <GlareCardDemo />
        </div>
        {/* Правая часть с формой */}
        <div className="md:w-1/2">
          <p className="font-medium text-blue-900 dark:text-blue-100 text-base md:text-xl text-center">
            Записаться на прием
          </p>
          <div className="max-w-md w-full mx-auto p-4">
            <form className="sm:space-y-11 space-y-3" onSubmit={handleSubmit}>
              <LabelInputContainer>
                <Label htmlFor="firstname">Имя</Label>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  id="firstname"
                  placeholder="Tyler"
                  type="text"
                  className="h-8 text-sm"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="email">Фамилия</Label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="example@.com"
                  type="email"
                  className="h-8 text-sm"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  placeholder="+7 921 457 00 57"
                  type="phone"
                  className="h-8 text-sm"
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="idea">Комментарии</Label>
                <Input
                  onChange={(e) => setDescription(e.target.value)}
                  id="idea"
                  className="border border-gray-300 rounded-md p-2 w-full h-20 resize-none text-sm"
                />
              </LabelInputContainer>
              <button
                className="bg-gradient-to-br from-black dark:from-zinc-900 to-neutral-600 dark:to-zinc-900 w-full text-white rounded-md h-10 text-sm font-medium"
                type="submit"
              >
                Записаться на прием
              </button>
            </form>
          </div>
        </div>
      </div>
    </ThematicContainer>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
