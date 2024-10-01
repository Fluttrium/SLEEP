import React from 'react';
import { Title } from './title';
import { TimelineDemo } from '../timelinecomponent';


const Steps = () => {
  return (
    <div>
      <Title text="Как это работает?" size="lg" className="text-center" /> {/* Исправлено здесь */}
      <Title text="Проблемы со сном не являются неизбежными. Позвольте нашей команде помочь вам!" size="md" className="text-center" />
      <TimelineDemo />
    </div>
  );
};

export default Steps;
