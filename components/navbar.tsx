"use client";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageDialog } from "@/components/language-dialog";
import { AuthButton } from "@/components/auth-button";
import { AuthButtonTest } from "@/components/auth-button-test";
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
      className={`fixed w-full top-0 left-0 z-50 transform transition-transform duration-300 bg-white/80 backdrop-blur-md border-b border-gray-200 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="min-h-16 flex justify-between items-center mx-auto container px-2 sm:px-4 md:px-8 lg:px-12 xl:px-20 py-2 sm:py-4">
        
        <div className="flex gap-2 sm:gap-4 lg:gap-6 items-center shrink-0">
          <Link
            href="/cemre-guner"
            className="text-xs sm:text-sm border-b-2 border-transparent hover:border-primary transition-colors duration-200 whitespace-nowrap"
          >
            {t("Navbar.cemre-guner")}
          </Link>
          <Link
            href="/blog"
            className="text-xs sm:text-sm border-b-2 border-transparent hover:border-primary transition-colors duration-200 whitespace-nowrap"
          >
            {t("Navbar.blog")}
          </Link>
          <Link
            href="/iletisim"
            className="text-xs sm:text-sm border-b-2 border-transparent hover:border-primary transition-colors duration-200 whitespace-nowrap"
          >
            {t("Navbar.contact")}
          </Link>
        </div>
        
        
        <Link href={"/"} className="text-xs sm:text-sm bg-black rounded-md p-1 font-semibold flex items-center justify-center mx-2 shrink-0">
          <span className="text-white mr-1 text-xs sm:text-sm">{t("Navbar.home")}</span>
          <span className="w-8 sm:w-10 lg:w-12 h-6 sm:h-7 lg:h-8 bg-white text-black flex items-center justify-center rounded text-xs">{t("Navbar.page")}</span>
        </Link>
        
        
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 justify-end shrink-0">
          <div className="hidden sm:flex items-center">
            <SearchIcon className="inline mr-1 sm:mr-2 w-3 sm:w-4 h-3 sm:h-4" />
            <input
              type="text"
              placeholder="..."
              className="px-1 sm:px-2 border-b-2 border-gray-300 hover:border-primary duration-200 cursor-pointer bg-transparent text-xs sm:text-sm w-16 sm:w-20"
            />
          </div>
          <div className="flex items-center">
            <AuthButton />
            {/* Test tamamlandı: <AuthButtonTest /> */}
          </div>
          <div className="flex items-center">
            <LanguageDialog />
          </div>
        </div>
      </div>
    </div>
  );
};
