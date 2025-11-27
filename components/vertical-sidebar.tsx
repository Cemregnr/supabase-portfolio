"use client";

import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export function VerticalSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("Navbar");

  
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  
  // Get current page name
  let currentPage = "";
  if (pathWithoutLocale === "/") {
    currentPage = t("home");
  } else if (pathWithoutLocale.includes("cemre-guner")) {
    currentPage = t("cemre-guner");
  } else if (pathWithoutLocale.includes("blog")) {
    currentPage = t("blog");
  } else if (pathWithoutLocale.includes("iletisim")) {
    currentPage = t("contact");
  } else if (pathWithoutLocale.includes("profile")) {
    currentPage = "Profil";
  } else if (pathWithoutLocale.includes("auth")) {
    currentPage = "Giriş";
  } else {
    // Extract page name from path
    const segments = pathWithoutLocale.split("/").filter(segment => segment !== "");
    const lastSegment = segments[segments.length - 1];
    if (lastSegment) {
      currentPage = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    } else {
      currentPage = "Sayfa";
    }
  }

  // Don't show on home page
  if (pathWithoutLocale === "/") {
    return null;
  }

  // Page-specific positioning adjustments
  let linePosition = "left-16"; // default
  let textPosition = "right-8"; // default
  let containerWidth = "w-32"; // default

  if (pathWithoutLocale.includes("cemre-guner")) {
    linePosition = "left-20";
    textPosition = "right-7";
    containerWidth = "w-32";
  } else if (pathWithoutLocale.includes("blog")) {
    linePosition = "left-14";
    textPosition = "right-13";
    containerWidth = "w-28";
  } else if (pathWithoutLocale.includes("iletisim")) {
    linePosition = "left-14";
    textPosition = "right-10";
    containerWidth = "w-28";
  } else if (pathWithoutLocale.includes("profile")) {
    linePosition = "left-16";
    textPosition = "right-8";
    containerWidth = "w-32";
  }

  return (
    <div className={`fixed left-0 top-0 bottom-0 z-40 ${containerWidth} flex items-center justify-center`}>
      {/* Vertical line - full height, positioned with page-specific spacing */}
      <div className={`absolute ${linePosition} w-0.5 h-screen bg-gray-800 dark:bg-gray-200`}></div>
      
      {/* Page name - rotated, positioned with page-specific spacing from line */}
      {currentPage && (
        <div className={`absolute ${textPosition} top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap`}>
          <span className="text-lg font-bold text-black dark:text-white">
            {currentPage}
          </span>
        </div>
      )}
    </div>
  );
}