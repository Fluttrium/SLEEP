import React from 'react';

import { TimelineDemo } from '../timelinecomponent';
import { Title } from "@/components/shared/ui/title";

const Steps = () => {
  return (
    <div className="my-8">
      <Title 
        text="Как это работает?" 
        size="4xl" 
        className="text-black font-bold text-center " // Текст остается черным
      /> 
      <Title 
        text="Проблемы со сном не являются неизбежными. Позвольте нашей команде помочь вам!" 
        size="2xl" 
        className="text-black font-semibold my-4 text-center " // Текст черного цвета
      />
      <p className="text-black text-xl italic mb-6 text-center ">
        Качественный сон — это основа вашего здоровья и хорошего самочувствия
      </p>
      <TimelineDemo />
    </div>
  );
};

export default Steps;
