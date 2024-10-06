import React from 'react';
import { CheckCircle } from 'lucide-react'; // Используем Lucide для галочки
import { Title } from './title';
import { BentoGridDemo } from '@/components/ui/bento-gridDemo';

export const SleepStats: React.FC = () => {
  return (
    <div className="text-center my-4">
       <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white py-4">
          Нарушение сна
        </h4>
      <BentoGridDemo />
    </div>
  );
};
