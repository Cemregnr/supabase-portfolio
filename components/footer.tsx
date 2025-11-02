import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="bg-navbar-bg text-white flex flex-col items-center justify-center py-6">
      <img
        src="https://media.licdn.com/dms/image/v2/D4D16AQEbJcY-NtWhAQ/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1707317492891?e=1762992000&v=beta&t=CtJvPWF1BI1UkRKLw6kl68Qqe-yDWy9xUz0xc1dCvzY"
        alt="Background flex"
        width={200}
        height={200}
        className="mb-4"
      />
      <div className="text-center">
        © Copyright Cemre Güner 2025
      </div>
    </footer>
  );
};
