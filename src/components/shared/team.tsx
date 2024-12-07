"use client"
import React from 'react';

import { TimelineDemo } from '../timelinecomponent';
import { Title } from "@/components/shared/ui/title";
import { GlareCard } from '../ui/glare-card';
import { GlareCardDemo } from '../ui/glare-cardDemo';
import Footer from '../footer';
import { GlareCardDemo4 } from '../ui/glare-cardDemo4';
import { GlareCardDemo3 } from '../ui/glare-cardDemo3';
import { GlareCardDemo5 } from '../ui/glare-cardDemo5';

const TeamCard = () => {
  return (
    <div className="flex flex-col items-center pb-8">
      <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white pb-4">
        Наша команда
      </h4>
      <GlareCardDemo />
      <hr className="my-8 w-1/2 border-t-2 border-gray-300 dark:border-gray-700" />
      <GlareCardDemo5 />
      <hr className="my-8 w-1/2 border-t-2 border-gray-300 dark:border-gray-700" />
      <GlareCardDemo3 />
      <hr className="my-8 w-1/2 border-t-2 border-gray-300 dark:border-gray-700" />
      <GlareCardDemo4 />
    </div>
  );
};


export default TeamCard;