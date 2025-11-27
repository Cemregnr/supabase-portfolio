"use client";

import React, { useState, useEffect } from "react";
import { Languages } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function LanguageDialog() {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("LanguageSwitcher");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 border hover:border-primary duration-200 cursor-pointer rounded-full">
        <Languages size={20} />
      </button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 border hover:border-primary duration-200 cursor-pointer rounded-full">
          <Languages size={20} />
        </button>
      </DialogTrigger>

      <DialogContent className="border-none">
        <DialogHeader>
          <DialogTitle>{t("selectLanguage")}</DialogTitle>
          <DialogDescription>{t("selectSiteLanguage")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 mt-2">
          <Link
            href="/"
            locale="tr"
            className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            Türkçe
          </Link>

          <Link
            href="/"
            locale="en"
            className="px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            English
          </Link>
        </div>

        <DialogFooter>
          <DialogClose className="mt-4 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200">
            {t("close")}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
