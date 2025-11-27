"use client";

import Image from "next/image";
import { Card } from "@/components/card";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">
      {/* HERO SECTION */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t("title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          {t("subtitle")}
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-300">
          {t("description")}
        </p>
      </div>

      {/* IMAGE CONTAINER */}
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
        {/* REAL IMAGE INSIDE */}
        <Image
          src="/education.jpg"
          alt="Profile"
          fill
          className="object-cover"
        />
      </div>

      {/* TITLE */}
      <h1 className="text-4xl font-bold pt-10 text-center md:text-6xl">
        Shaping Futures Through Education
      </h1>

      {/* DESCRIPTION */}
      <p className="pt-5 text-center max-w-2xl md:text-xl">
        Explore my teaching portfolio, read my blog, and join me on a journey
        of growth, creativity, and meaningful education.
      </p>
    </div>
  );
}
