import React from 'react';

import { TimelineDemo } from '../timelinecomponent';
import {Title} from "@/components/shared/ui/title";


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
