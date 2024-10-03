import React from 'react';
import { CheckCircle } from 'lucide-react'; // Используем Lucide для галочки
import { Title } from './ui/title';


// Импорт заголовка

interface CardProps {
  title: string;
  content: string;
  backgroundImage: string;
}

const InfoCard: React.FC<CardProps> = ({ title, content, backgroundImage }) => {
  return (
    <div
      className="relative bg-white p-4 rounded-lg shadow-md text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Title text={title} size="sm" className="mb-2" /> {/* Используем заголовок из shared */}
      <p className="text-gray-600">{content}</p>
      {/* Галочка в правом нижнем углу */}
      <CheckCircle className="absolute bottom-4 right-4 text-green-500 w-6 h-6" />
    </div>
  );
};

export const SleepStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Первый ряд карточек */}
      <InfoCard
        title="Более 60 нарушений сна"
        content="Бессонница и сонливость - основные симптомы всех нарушений сна"
        backgroundImage="/iStock-896820002-1.jpg" // Путь к изображению
      />
      <InfoCard
        title="18,1%"
        content="Распространенность синдрома апноэ во сне в РФ"
        backgroundImage="/iStock-896820002-1.jpg"
      />
      <InfoCard
        title="39%"
        content="Россиян испытывают избыточную дневную сонливость"
        backgroundImage="/iStock-896820002-1.jpg"
      />

      {/* Второй ряд карточек */}
      <InfoCard
        title="100%"
        content="Жизнеугрожающие заболевания, такие как синдром апноэ во сне, не выявляются врачами"
        backgroundImage="/iStock-896820002-1.jpg"
      />
      <InfoCard
        title="0,9%"
        content="Лиц с инсомнией направляются на когнитивно-поведенческую терапию инсомнии"
        backgroundImage="/iStock-896820002-1.jpg"
      />
      <InfoCard
        title="9,7 лет"
        content="Среднее время постановки диагноза нарколепсии от появления симптомов"
        backgroundImage="/iStock-896820002-1.jpg"
      />
      <InfoCard
        title="Сомнология"
        content="Специализация по нарушениям сна, отсутствующая в России"
        backgroundImage="/iStock-896820002-1.jpg"
      />
    </div>
  );
};
