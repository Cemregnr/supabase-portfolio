"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();

  // en/cemre-guner

  let paths = pathName.split("/"); // en, cemre-guner

  let myPathName = "";

  if (paths.length > 2) {
    myPathName = paths[2].replaceAll("-", " ");
  } else {
    myPathName = "Home";
  }

  return (
    <AnimatePresence mode="wait">
      <div
        key={pathName}
        className="w-screen min-h-screen bg-gradient-to-b from-primary/10 to-primary/60"
      >
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-b-[100px] z-40"
          animate={{ height: "0vh" }}
          exit={{ height: "140vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="fixed m-auto top-0 bottom-0 left-0 right-0 text-white text-8xl cursor-default z-50 w-fit h-fit capitalize"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {myPathName}
        </motion.div>
        <motion.div
          className="h-screen w-screen fixed bg-black rounded-t-[100px] bottom-0 z-30"
          initial={{ height: "140vh" }}
          animate={{ height: "0vh", transition: { delay: 0.5 } }}
        />
        <div className="h-24">
          <Navbar />
        </div>
        <div className="min-h-[calc(100vh-6rem)]">{children}</div>
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default TransitionProvider;
