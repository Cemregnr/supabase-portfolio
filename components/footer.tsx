import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-navbar-bg text-white flex flex-col items-center justify-center py-6">
      <img
        src="/footer.jpeg"
        width={200}
        height={200}
        className="mb-4"
        alt="footer"
      />
      <div className="text-center">
        © Copyright Cemre Güner 2025
      </div>
    </footer>
  );
};
