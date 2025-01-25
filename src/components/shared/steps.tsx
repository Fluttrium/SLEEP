import React from 'react';
import { TimelineDemo } from '../timelinecomponent';

const Steps = () => {
  return (
    <div className=""> {/* mt-10 для мобильной версии, sm:mt-20 для более крупных экранов */}
      <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-4xl mx-auto text-center tracking-tight font-medium text-black dark:text-white py-4">
        Как это работает?
      </h4>
      <h4 className="text-xl lg:text-3xl font-semibold my-4 text-center text-black dark:text-white max-w-3xl mx-auto">
        Проблемы со сном не являются неизбежными. Позвольте нашей команде помочь вам!
      </h4>
      <div className="text-black dark:text-white text-xl italic mb-6 text-center max-w-2xl mx-auto">
        Качественный сон — это основа вашего здоровья и хорошего самочувствия
      </div>
      <TimelineDemo />
    </div>
  );
};

export default Steps;
