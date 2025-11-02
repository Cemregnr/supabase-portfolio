// components/Card.tsx
"use client";
import Image from "next/image";

export const Card = () => {
  return (
    <div className="relative w-80 h-60 overflow-hidden rounded-lg">
      <div className="absolute inset-0 transition-all duration-700 ease-out hover:object-[center_top]">
        <Image
          src="/education.jpg" // kendi resmini buraya koy
          alt="Example"
          fill
          className="object-cover object-[center_60%] transition-all duration-700 ease-out hover:object-[center_40%]"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
        <h3 className="text-lg font-semibold">Project Title</h3>
        <p className="text-sm">Project Description</p>
      </div>
    </div>
  );
};
