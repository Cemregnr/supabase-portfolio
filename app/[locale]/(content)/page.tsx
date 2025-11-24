"use client";

import Image from "next/image";
import { Card } from "@/components/card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center">

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
