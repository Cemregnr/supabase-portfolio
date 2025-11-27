"use client";

import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export function VerticalSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("Navbar");

  // Remove locale from pathname for processing
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  
  // Get current page name
  let currentPage = "";
  if (pathWithoutLocale === "/") {
    currentPage = t("home");
  } else if (pathWithoutLocale.includes("cemre-guner")) {
    currentPage = t("cemre-guner");
  } else if (pathWithoutLocale.includes("blog")) {
    currentPage = t("blog");
  } else if (pathWithoutLocale.includes("contact")) {
    currentPage = t("contact");
  } else {
    // Extract page name from path
    const segments = pathWithoutLocale.split("/").filter(segment => segment !== "");
    currentPage = segments[segments.length - 1]?.charAt(0).toUpperCase() + segments[segments.length - 1]?.slice(1) || "";
  }

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
      {/* Vertical line */}
      <div className="w-0.5 h-32 bg-gray-800 dark:bg-gray-200 ml-6"></div>
      
      {/* Page name - rotated */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 -rotate-90 whitespace-nowrap">
        <span className="text-lg font-bold text-black dark:text-white">
          {currentPage}
        </span>
      </div>
    </div>
  );
}