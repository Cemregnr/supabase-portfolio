"use client";
import Brain from "@/components/brain";
import { motion, useInView, useScroll } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export default function CemreGuner() {
  const t = useTranslations("cemre");
  const { scrollYProgress } = useScroll();
  const skillRef = useRef<HTMLDivElement | null>(null);
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <motion.div className="min-h-screen p-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Cemre Güner
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 min-h-[800px]">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
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
          className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
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
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.classroomManagement")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.curriculumDevelopment")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.technologyIntegration")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.communication")}</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="relative" ref={experienceRef}>
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2, duration: 1 }}
              className="font-bold text-2xl"
            >
              {t("experience.title")}
            </motion.h1>
            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-8 space-y-6"
            >
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="bg-primary p-3 font-semibold rounded text-sm mb-2">{t("experience.items.0.title")}</div>
                <div className="text-sm italic leading-relaxed mb-2">{t("experience.items.0.desc")}</div>
                <div className="text-black text-sm font-semibold mb-2">{t("experience.items.0.date")}</div>
                <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.0.company")}</div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="bg-primary p-3 font-semibold rounded text-sm mb-2">{t("experience.items.1.title")}</div>
                <div className="text-sm italic leading-relaxed mb-2">{t("experience.items.1.desc")}</div>
                <div className="text-black text-sm font-semibold mb-2">{t("experience.items.1.date")}</div>
                <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.1.company")}</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <Brain scrollYProgress={scrollYProgress} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
import { useTranslations } from "next-intl";

export default function CemreGuner() {
  const t = useTranslations("cemre");
  const { scrollYProgress } = useScroll();
  const skillRef = useRef<HTMLDivElement | null>(null);
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <motion.div className="min-h-screen p-6">
      {/* HEADER WITH PROFILE IMAGE */}
      <div className="text-center mb-16">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <Image
            src="/me.jpg"
            alt="Cemre Güner"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Cemre Güner
        </h1>
      </div>

      {/* 4-QUADRANT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 min-h-[800px]">
        {/* TOP LEFT - BIOGRAPHY */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h1 className="font-bold text-2xl">{t("biography")}</h1>
          <div>
            <p className="text-lg">{t("bio")}</p>
          </div>
        </motion.div>

        {/* TOP RIGHT - SKILLS */}
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
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
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.classroomManagement")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.curriculumDevelopment")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.technologyIntegration")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.communication")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.lessonPlanning")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.criticalThinking")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.culturalAwareness")}</div>
              <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.digitalLiteracy")}</div>
            </motion.div>
          </div>
        </motion.div>

        {/* BOTTOM LEFT - EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="flex flex-col gap-12 justify-center relative w-full">
            {/* EXPERIENCE TITLE */}
            <div className="relative" ref={experienceRef}>
              <motion.h1
                initial={{ x: "-300px" }}
                animate={isExperienceRefInView ? { x: "0" } : {}}
                transition={{ delay: 0.2, duration: 1 }}
                className="font-bold text-2xl"
              >
                {t("experience.title")}
              </motion.h1>
              <motion.div
                initial={{ x: "-300px" }}
                animate={isExperienceRefInView ? { x: "0" } : {}}
                transition={{ delay: 0.4, duration: 1 }}
                className="w-full flex flex-col gap-12 justify-center mt-8"
              >
                {/* EXPERIENCE LIST */}
                <div className="flex justify-between h-48">
                  {/* LEFT */}
                  <div className="w-1/3">
                    <div className="bg-primary p-3 font-semibold rounded text-sm">{t("experience.items.0.title")}</div>
                    <div className="text-sm italic leading-relaxed">{t("experience.items.0.desc")}</div>
                    <div className="text-black text-sm font-semibold">{t("experience.items.0.date")}</div>
                    <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.0.company")}</div>
                  </div>
                  {/* CENTER */}
                  <div className="w-1/6 flex justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div className="w-1/3"></div>
                </div>

                <div className="flex justify-between h-48">
                  {/* LEFT */}
                  <div className="w-1/3"></div>
                  {/* CENTER */}
                  <div className="w-1/6 flex justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div className="w-1/3">
                    <div className="bg-primary p-3 font-semibold rounded text-sm">{t("experience.items.1.title")}</div>
                    <div className="text-sm italic leading-relaxed">{t("experience.items.1.desc")}</div>
                    <div className="text-black text-sm font-semibold">{t("experience.items.1.date")}</div>
                    <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.1.company")}</div>
                  </div>
                </div>

                <div className="flex justify-between h-48">
                  {/* LEFT */}
                  <div className="w-1/3">
                    <div className="bg-primary p-3 font-semibold rounded text-sm">{t("experience.items.2.title")}</div>
                    <div className="text-sm italic leading-relaxed">{t("experience.items.2.desc")}</div>
                    <div className="text-black text-sm font-semibold">{t("experience.items.2.date")}</div>
                    <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.2.company")}</div>
                  </div>
                  {/* CENTER */}
                  <div className="w-1/6 flex justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div className="w-1/3"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM RIGHT - BRAIN COMPONENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <Brain scrollYProgress={scrollYProgress} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CemreGuner() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen px-6">
      <h1 className="text-4xl font-bold text-center mb-8">Cemre Güner</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">Biography</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Software developer passionate about modern web technologies.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">Skills</h2>
          <div className="grid grid-cols-2 gap-3">
            {["JavaScript", "React", "Next.js", "TypeScript"].map((skill) => (
              <div key={skill} className="bg-primary text-white p-2 rounded text-center text-sm">
                {skill}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 border-b-2 border-primary pb-2">Experience</h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <h3 className="font-semibold">Senior Developer</h3>
              <p className="text-sm text-primary">2022 - Present</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Creative Mind</h3>
            <Brain scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}
import { useTranslations } from "next-intl";

export default function CemreGuner() {
  const { scrollYProgress } = useScroll();
  const skillRef = useRef<HTMLDivElement | null>(null);
  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  return (
    <motion.div className="min-h-screen p-6">
      {/* HEADER WITH PROFILE IMAGE */}
      <div className="text-center mb-16">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <Image
            src="/me.jpg"
            alt="Cemre Güner"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Cemre Güner
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Software Developer & Tech Enthusiast
        </p>
      </div>

      {/* 4-QUADRANT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 min-h-[800px]">
        {/* TOP LEFT - BIOGRAPHY */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-primary pb-3">
            Biography
          </h2>
          <div className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
            <p>
              Merhaba! Ben Cemre, passionate bir yazılım geliştiricisiyim. 
              Modern web teknolojileri ve kullanıcı deneyimi konularında uzmanlaşmış, 
              sürekli öğrenmeye açık bir mühendisim.
            </p>
            <p>
              React, Next.js ve TypeScript gibi teknolojilerle çalışıyor, 
              kullanıcı odaklı ve performanslı uygulamalar geliştiriyorum.
            </p>
            <p>
              Ekip çalışmasına yatkın, problem çözme odaklı ve sürekli kendimi 
              geliştirmeyi seven biri olarak, teknoloji dünyasındaki yenilikleri 
              takip ediyor ve projelerimde uygulamaya çalışıyorum.
            </p>
          </div>
        </motion.div>

        {/* TOP RIGHT - SKILLS */}
        <motion.div
          ref={skillRef}
          initial={{ opacity: 0, x: 100 }}
          animate={isSkillRefInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-primary pb-3">
            Skills
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "JavaScript", "TypeScript", "React", "Next.js", 
              "Node.js", "Python", "Git", "Docker", 
              "MongoDB", "PostgreSQL", "AWS", "Tailwind CSS"
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isSkillRefInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-r from-primary to-primary-dark text-white p-3 rounded-lg text-center font-medium text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BOTTOM LEFT - EXPERIENCE */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-primary pb-3">
            Experience
          </h2>
          <div className="space-y-6">
            {/* Experience Item 1 */}
            <motion.div 
              className="relative p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Senior Frontend Developer
                  </h3>
                  <p className="text-primary font-medium text-sm">Tech Company • 2022 - Present</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    React ve Next.js ile modern web uygulamaları geliştirme, 
                    performans optimizasyonu ve team leadership.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Experience Item 2 */}
            <motion.div 
              className="relative p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Full Stack Developer
                  </h3>
                  <p className="text-primary font-medium text-sm">Startup • 2020 - 2022</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    MERN stack ile full-stack web uygulamaları geliştirme, 
                    API tasarımı ve database yönetimi.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Experience Item 3 */}
            <motion.div 
              className="relative p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Junior Developer
                  </h3>
                  <p className="text-primary font-medium text-sm">Agency • 2019 - 2020</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                    HTML, CSS, JavaScript ile responsive web siteleri geliştirme, 
                    WordPress ve PHP ile backend çalışmaları.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* BOTTOM RIGHT - ANIMATED BRAIN */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Creative Mind
              </h3>
              <Brain scrollYProgress={scrollYProgress} />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Always thinking, always creating
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      {/* CONTAINER */}
      <div className="h-full lg:flex">
        {/* TEXT CONTAINER */}
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-48 flex flex-col gap-24 md:gap-32 lg:gap-48 xl:gap-64 w-full">
          {/* BIO + SKILLS: side-by-side */}
          <div className="flex flex-col lg:flex-row lg:gap-12">
            {/* BIOGRAPHY CONTAINER (left) */}
            <div className="flex flex-col gap-6 lg:w-1/2">
              {/* BIOGRAPHY TITLE */}
              <h1 className="font-bold text-2xl">{t("biography")}</h1>
              {/* BIOGRAPHY DESC */}
              <p className="text-lg">{t("bio")}</p>
              <div className="self-end">
              <svg
                width="283"
                height="162"
                viewBox="0 0 283 162"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M112 39.5217C112 33.2317 111.34 22.5417 109.01 18.5367C106.59 14.3761 103.02 10.5417 99.0152 7.69666C95.4237 5.14543 90.3602 3.86166 85.1852 2.36166C76.865 -0.0499938 64.0202 1.18166 60.0152 2.68166C55.7494 4.27931 52.0202 6.18166 47.1852 10.1717C43.0614 13.5747 39.0202 17.5017 35.8452 21.5067C32.6702 25.5117 30.0202 28.8417 26.8452 34.6617C23.0188 41.6757 21.3402 47.1617 20.0052 53.1667C18.9501 57.9127 18.0002 75.7017 19.9902 86.6717C20.9768 92.1105 25.9802 95.5017 29.9852 101.167C34.2216 107.159 39.9802 112.842 44.8152 115.347C48.8644 117.445 52.9802 118.522 58.6452 120.347C63.3199 121.853 78.5402 122.522 88.8152 121.527C93.905 121.034 98.9802 117.862 103.815 114.867C108.265 112.11 113.64 107.542 116.99 103.537C120.201 99.6984 122.66 95.5417 123.165 91.5367C123.422 89.4973 124 86.5417 123.175 83.5417C122.827 82.2767 120.7 82.5217 119.355 82.6867C114.978 83.2237 110.7 89.8217 108.67 94.5067C106.89 98.6143 105.34 102.502 104.17 108.162C103.764 110.127 104 112.802 104.495 114.327C105.229 116.587 111.29 116.522 118.945 115.697C129.433 114.566 133.64 107.542 137.985 104.367C142.696 100.924 148.64 97.5417 152.32 93.5367C156.155 89.3634 158.65 85.8717 160.985 83.8667C163.124 82.0302 156.68 91.1617 153.845 95.3417C151.327 99.0548 148.68 102.502 147.67 107.337C147.183 109.667 146 111.842 146.825 113.677C148.995 118.502 156.64 108.542 159.325 104.372C162.507 99.4297 165.32 95.5417 167.825 91.5367C168.972 89.7031 169.66 87.5317 170.495 86.5267C172.474 84.1446 167.02 94.1617 165.835 98.5067C165.567 99.4892 165.34 100.502 165.17 102.167C165 103.832 165 106.142 167.64 107.332C174.942 110.623 182.32 107.862 184.815 106.532C189.352 104.113 193.64 100.202 198.315 95.0467C205.439 87.1909 208 80.8717 207.67 79.0317C206.882 74.6358 202.68 87.5017 200.175 91.5067C197.839 95.2416 197 100.162 195.175 105.337C193.455 110.214 192 114.842 191.34 117.172C191.011 118.333 189.36 118.842 188.35 118.687C187.34 118.532 186.68 117.542 186.34 115.712C184.846 107.669 188.98 101.562 193.15 95.8717C196.519 91.2744 201.98 90.8617 207.645 88.5317C212.209 86.6545 219.94 83.5417 225.985 82.3567C230.636 81.445 236.64 80.2017 241.98 79.3567C244.653 78.9338 248.97 77.2017 253.47 74.7067C255.789 73.4212 255.33 70.5317 255.335 68.8667C255.337 68.1175 254.02 67.8617 253.015 67.8567C248.797 67.8357 245.02 73.1617 241.015 75.8467C236.704 78.7368 234.68 84.8217 231.68 90.3317C226.955 99.0096 227.34 105.502 227.495 111.502C227.592 115.247 238.28 113.522 243.985 111.532C248.464 109.969 250.98 105.202 257.475 97.3867C261.438 92.6189 263.98 89.2017 269.48 82.0517C273.364 77.0023 275.32 72.5417 277.825 64.8867C280.139 57.8172 279.66 51.5417 280.33 47.5367C280.698 45.3401 282 43.5317 281.505 41.7017C280.954 39.6641 277.68 39.1917 272.215 38.6917C261.185 37.6825 248.39 39.1817 224.71 46.6167C206.64 53.3917 176.28 66.2617 136.88 86.2567C97.4802 106.252 49.9602 132.982 1.00018 160.522"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* SKILLS CONTAINER (right) */}
            <div className="flex flex-col gap-6 lg:w-1/2" ref={skillRef}>
              {/* SKILL TITLE */}
              <motion.h2
                initial={{ x: "300px" }}
                animate={isSkillRefInView ? { x: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="font-bold text-2xl"
              >
                {t("skills.title")}
              </motion.h2>
              {/* SKILL LIST - Horizontal Grid */}
              <motion.div 
                initial={{ x: "300px" }} 
                animate={isSkillRefInView ? { x: 0 } : {}} 
                transition={{ delay: 0.5 }} 
                className="grid grid-cols-2 lg:grid-cols-4 gap-2"
              >
                <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.classroomManagement")}</div>
                <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.curriculumDevelopment")}</div>
                <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.technologyIntegration")}</div>
                <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.communication")}</div>
                <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.lessonPlanning")}</div>
                <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.criticalThinking")}</div>
                <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.culturalAwareness")}</div>
                <div className="rounded p-2 text-xs text-center cursor-pointer bg-black text-white hover:bg-white hover:text-black transition-colors">{t("skills.digitalLiteracy")}</div>
              </motion.div>
            </div>

            {/* SKILL SCROLL SVG */}
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width={50}
              height={50}
            >
              <path
                d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
                stroke="#000000"
                strokeWidth="1"
              ></path>
              <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>

          </div>
          {/* EXPERIENCE SECTION */}
          <div className="flex flex-col lg:flex-row lg:gap-12">
            {/* EXPERIENCE CONTAINER */}
            <div
              className="flex flex-col gap-12 lg:w-2/3"
              ref={experienceRef}
            >
              {/* EXPERIENCE TITLE */}
              <motion.h2
                initial={{ x: "-300px" }}
                animate={isExperienceRefInView ? { x: "0" } : {}}
                transition={{ delay: 0.2 }}
                className="font-bold text-2xl"
              >
                {t("experience.title")}
              </motion.h2>
              {/* EXPERIENCE LIST */}
              <motion.div
                initial={{ x: "-300px" }}
                animate={isExperienceRefInView ? { x: "0" } : {}}
                className="space-y-12"
              >
                {/* EXPERIENCE LIST ITEM 1 */}
                <div className="flex justify-between min-h-[200px]">
                  {/* LEFT */}
                  <div className="w-1/3 space-y-3">
                    <div className="bg-primary p-3 font-semibold rounded text-sm">{t("experience.items.0.title")}</div>
                    <div className="text-sm italic leading-relaxed">{t("experience.items.0.desc")}</div>
                    <div className="text-black text-sm font-semibold">{t("experience.items.0.date")}</div>
                    <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.0.company")}</div>
                  </div>
                  {/* CENTER */}
                  <div className="w-1/6 flex justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div className="w-1/3"></div>
                </div>

                {/* EXPERIENCE LIST ITEM 2 */}
                <div className="flex justify-between min-h-[200px]">
                  {/* LEFT */}
                  <div className="w-1/3"></div>
                  {/* CENTER */}
                  <div className="w-1/6 flex justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div className="w-1/3 space-y-3">
                    <div className="bg-primary p-3 font-semibold rounded text-sm">{t("experience.items.1.title")}</div>
                    <div className="text-sm italic leading-relaxed">{t("experience.items.1.desc")}</div>
                    <div className="text-black text-sm font-semibold">{t("experience.items.1.date")}</div>
                    <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.1.company")}</div>
                  </div>
                </div>

                {/* EXPERIENCE LIST ITEM 3 */}
                <div className="flex justify-between min-h-[200px]">
                  {/* LEFT */}
                  <div className="w-1/3 space-y-3">
                    <div className="bg-primary p-3 font-semibold rounded text-sm">{t("experience.items.2.title")}</div>
                    <div className="text-sm italic leading-relaxed">{t("experience.items.2.desc")}</div>
                    <div className="text-black text-sm font-semibold">{t("experience.items.2.date")}</div>
                    <div className="inline-block px-3 py-1 rounded bg-primary/30 text-sm font-semibold">{t("experience.items.2.company")}</div>
                  </div>
                  {/* CENTER */}
                  <div className="w-1/6 flex justify-center">
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-primary bg-white -left-2 top-0"></div>
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div className="w-1/3"></div>
                </div>
              </motion.div>
            </div>

            {/* BRAIN CONTAINER - Right side of experience */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="sticky top-24 flex justify-center">
                <div className="w-full max-w-sm min-h-[300px]">
                  <Brain scrollYProgress={scrollYProgress} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
