// components/Card.tsx
"use client";
import Image from "next/image";

export const Card = () => {
  return (
    <div className="relative w-80 h-60 rounded-lg">
      
      <div className="absolute inset-0 crop-rect rounded-lg">
        <Image
          src="/education.jpg"
          alt="Example"
          width={1200}
          height={900}
          className="card-image"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-transparent from-black/60 to-transparent text-white">
        <h3 className="text-lg font-semibold">Project Title</h3>
        <p className="text-sm">Project Description</p>
      </div>
    </div>
  );
};
