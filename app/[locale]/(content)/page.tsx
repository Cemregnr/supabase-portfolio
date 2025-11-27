"use client";

import Image from "next/image";
import { Card } from "@/components/card";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center">
      
      <h1 className="font-bold text-black text-2xl md:text-3xl mb-4 text-center whitespace-nowrap">
        {t('title')}
      </h1>

     
      <p className="text-lg md:text-xl leading-relaxed text-center max-w-2xl mb-8 px-4">
        {t('description')}
      </p>

      
      <div
        className="
          relative 
          w-[700px]         
          h-[600px]        
          overflow-hidden 
          transition-all 
          duration-300 
          hover:h-[450px]   
        "
      >
        <Image
          src="/education.jpg"
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
