"use client"
import React from 'react';

import { TimelineDemo } from '../timelinecomponent';
import { Title } from "@/components/shared/ui/title";
import { GlareCard } from '../ui/glare-card';
import { GlareCardDemo } from '../ui/glare-cardDemo';
import Footer from '../footer';

const TeamCard = () => {
  return (
    <div className="flex flex-col items-center pb-8">
      <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white pb-4">
        Наша команда
      </h4>
      <GlareCardDemo />
    </div>
  );
};


export default TeamCard;