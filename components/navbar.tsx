"use client";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageDialog } from "@/components/language-dialog";
import {motion} from "framer-motion"

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (y > lastY.current && y > 50) {
            setHidden(true);
          } else if (y < lastY.current) {
            setHidden(false);
          }
          lastY.current = y;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed w-full top-0 left-0 z-50 transform transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="h-24 flex justify-between py-8 mx-auto container items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:-48">
      <div className="flex gap-10 items-center w-1/3">
        <Link
          href="/blog"
          className="border-b-2 border-transparent hover:border-primary transition-colors duration-200"
        >
          {t("Navbar.blog")}
        </Link>
        <Link
          href="/iletisim"
          className="border-b-2 border-transparent hover:border-primary transition-colors duration-200"
        >
          {t("Navbar.contact")}
        </Link>
      </div>
      {/* LOGO */}
      <Link href={"/"} className="text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center  ">
      <span className="text-white mr-1 ">Home</span>
      <span className="w-12 h-8 bg-white text-black flex items-center justify-center rounded ">Page</span>
      </Link>
      <div className="flex items-center gap-4 w-1/3 ">
        <div>
          <SearchIcon className="inline mr-2  " />
          <input
            type="text"
            placeholder="..."
            className="px-2 border-b-2 border/40 hover:border-primary duration-200 cursor-pointer "
          />
        </div>

        <a
          className="border/40 border-b-2 hover:border-primary duration-200 cursor-pointer"
          href="/cemre-guner"
          
        >
          Cemre Güner
        </a>

        <LanguageDialog />
      </div>
      </div>
    </div>
  );
};
