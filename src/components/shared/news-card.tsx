import Link from 'next/link';
import React from 'react';
import { Title } from './ui/title';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  id: number;
  title: string;
  imageUrl: string;
  body: string;
  className?: string;
}

export const NewsCard: React.FC<Props> = ({
  id,
  title,
  body,
  imageUrl,
  className,
}) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={title} />
        </div>
        <Title text={title} size="sm" className="mb-1 mt-3 font-bold" />
        <div className="text-sm text-gray-400">
          Нарушение сна, здоровый сон, апноэ во сне, сомнология
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            <b>{body}</b>
          </span>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Читать
          </Button>
        </div>
      </Link>
    </div>
  );
};
