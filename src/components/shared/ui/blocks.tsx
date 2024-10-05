import React from 'react';
import { CheckCircle } from 'lucide-react'; // Используем Lucide для галочки
import { Title } from './title';
import { BentoGridDemo } from '@/components/ui/bento-gridDemo';

export const SleepStats: React.FC = () => {
  return (
    <div className="text-center my-6">
      <Title text="Нарушения сна" size="lg" className="text-center" /> {/* Центрированный заголовок */}
      <BentoGridDemo />
    </div>
  );
};
