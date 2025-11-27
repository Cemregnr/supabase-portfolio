"use client";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function CemreGuner() {
  const t = useTranslations("cemre");
  const skillRef = useRef<HTMLDivElement | null>(null);
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <motion.div className="min-h-screen p-6">
     
      <div className="text-center mb-16">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <Image
            src="/education.jpg"
            alt="Cemre Güner"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Cemre Güner
        </h1>
      </div>

      <div className="space-y-16">
       
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 p-6 bg-transparent rounded-lg"
        >
          <h1 className="font-bold text-2xl">{t("biography")}</h1>
          <div>
            <p className="text-lg">{t("bio")}</p>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6 p-6 bg-transparent rounded-lg"
        >
          <div className="flex flex-col gap-6" ref={skillRef}>
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2, duration: 1 }}
              className="font-bold text-2xl"
            >
              {t("skills.title")}
            </motion.h1>
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="flex flex-wrap gap-4"
            >
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">{t("skills.classroomManagement")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">{t("skills.curriculumDevelopment")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">{t("skills.technologyIntegration")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">{t("skills.communication")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">{t("skills.lessonPlanning")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">{t("skills.criticalThinking")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">{t("skills.culturalAwareness")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-primary text-white hover:bg-white hover:text-black transition-colors">{t("skills.digitalLiteracy")}</div>
            </motion.div>
          </div>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-6 p-6 bg-transparent rounded-lg"
        >
          <div className="flex flex-col gap-12 justify-center relative w-full max-w-4xl mx-auto">
            <div className="relative" ref={experienceRef}>
              <motion.h1
                initial={{ x: "-300px" }}
                animate={isExperienceRefInView ? { x: "0" } : {}}
                transition={{ delay: 0.2, duration: 1 }}
                className="font-bold text-2xl text-center mb-8"
              >
                {t("experience.title")}
              </motion.h1>
              <motion.div
                initial={{ x: "-300px" }}
                animate={isExperienceRefInView ? { x: "0" } : {}}
                transition={{ delay: 0.4, duration: 1 }}
                className="w-full flex flex-col gap-12 justify-center mt-8"
              >
                <div className="flex justify-between h-48">
                  <div className="w-1/3">
                    <div className="bg-primary p-3 font-semibold text-white rounded text-sm">{t("experience.items.0.title")}</div>
                    <div className="text-sm italic leading-relaxed">{t("experience.items.0.desc")}</div>
                    <div className="text-black text-sm font-semibold">{t("experience.items.0.date")}</div>
                    <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.0.company")}</div>
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                    </div>
                  </div>
                  <div className="w-1/3"></div>
                </div>

                <div className="flex justify-between h-48">
                  <div className="w-1/3"></div>
                  <div className="w-1/6 flex justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <div className="bg-primary p-3 font-semibold text-white rounded text-sm">{t("experience.items.1.title")}</div>
                    <div className="text-sm italic leading-relaxed">{t("experience.items.1.desc")}</div>
                    <div className="text-black text-sm font-semibold">{t("experience.items.1.date")}</div>
                    <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.1.company")}</div>
                  </div>
                </div>

                <div className="flex justify-between h-48">
                  <div className="w-1/3">
                    <div className="bg-primary p-3 font-semibold text-white rounded text-sm">{t("experience.items.2.title")}</div>
                    <div className="text-sm italic leading-relaxed">{t("experience.items.2.desc")}</div>
                    <div className="text-black text-sm font-semibold">{t("experience.items.2.date")}</div>
                    <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.2.company")}</div>
                  </div>
                  <div className="w-1/6 flex justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                    </div>
                  </div>
                  <div className="w-1/3"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}