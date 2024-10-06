import React from 'react';
import { TimelineDemo } from '../timelinecomponent';
import { Title } from "@/components/shared/ui/title";

const Steps = () => {
  return (
    <div className="my-8">
      <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white py-4">
        Как это работает?
      </h4>
      <h4 className="text-xl lg:text-3xl font-semibold my-4 text-center text-black dark:text-white">
        Проблемы со сном не являются неизбежными. Позвольте нашей команде помочь вам!
      </h4>
      <p className="text-black dark:text-white text-xl italic mb-6 text-center">
        Качественный сон — это основа вашего здоровья и хорошего самочувствия
      </p>
      <TimelineDemo />
    </div>
  );
};

export default Steps;
