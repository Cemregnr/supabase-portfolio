"use client";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageDialog } from "@/components/language-dialog";
import {motion} from "framer-motion"

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  return (
    <div className="h-full flex justify-between py-8 mx-auto container items-center px-4 sm:px-8 md:px-12 lg:px-20 xl:-48">
      <div className="flex gap-10 items-center w-1/3">
        <Link
          href="/blog"
          className="border-b-2 border-transparent hover:border-primary transition-colors duration-200"
        >
          {t("Navbar.blog")}
        </Link>
        <Link
          href="/contact"
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
  );
};
