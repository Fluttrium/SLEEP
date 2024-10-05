"use client"
import React from 'react';

import { TimelineDemo } from '../timelinecomponent';
import { Title } from "@/components/shared/ui/title";
import { GlareCard } from '../ui/glare-card';
import { GlareCardDemo } from '../ui/glare-cardDemo';

const TeamCard = () => {
  return (
    <div className="flex flex-col items-center py-32">
      <Title 
        text="Наша команда" 
        size="4xl" 
        className="text-black font-bold text-center my-8 " // Текст остается черным
      /> 
      <GlareCardDemo/>
    </div>
  );
};

export default TeamCard;