"use client";

import { Card } from "@/components/card";
import { useParams } from "next/navigation";

export default function HomePage() {
  const params = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-1/2 flex justify-between items-center gap-8 ">
        {/* LEFT: IMAGE CONTAINER */}
        {/* <div className="flex-1 aspect-square relative rounded lg:h-full lg:w-1/2  ">
          <Image
            src="/education.jpg"
            alt="education"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div> */}
        <Card />

        {/* RIGHT: ANIMATION CONTAINER  */}
        {/* <div className="flex-1 aspect-square bg-gray-100 rounded-lg">
         
        </div> */}
      </div>
      <div className="h-1/2 flex flex-col gap-8 items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 xl:-48 "></div>
      {/* TITLE */}
      <h1 className="text-4xl font-bold pt-8 md:text-6xl">
        Shaping Futures Through Education
      </h1>
      {/* DESCRIPTION */}
      <p className="pt-5 md:text-xl">
        Explore my teaching portfolio, read my blog, and join me on a journey of
        growth, creativity, and meaningful education.
      </p>
    </div>
  );
}
