"use client";

import { useRef, useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useTranslations } from "next-intl";

const ContactPage = () => {
  const t = useTranslations("contact");
  const form = useRef<HTMLFormElement | null>(null);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(false);
    setSuccess(false);
    setIsSending(true);

    const formEl = form.current;
    if (!formEl) return;

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError(true);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formEl, publicKey).then(
      () => {
        setSuccess(true);
        formEl.reset();
        setIsSending(false);
      },
      () => {
        setError(true);
        setIsSending(false);
      }
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-transparent">
      <form
        onSubmit={sendEmail}
        ref={form}
        className="w-full max-w-md rounded-xl text-lg flex flex-col gap-4 p-6 bg-transparent"
      >
        {/* MESSAGE */}
        <label className="font-semibold">{t("message")}</label>
        <textarea
          rows={6}
          className="bg-transparent  resize-y py-3 px-3 rounded-md min-h-32 text-lg"
          name="user_message"
          required
          aria-label={t("message")}
        />

        {/* EMAIL */}
        <label className="font-semibold">{t("email")}</label>
        <input
          name="user_email"
          type="email"
          required
          className="bg-transparent border-b-2 border-b-black outline-none py-2 text-lg"
          aria-label={t("email")}
        />

        {/* REGARDS - no underline or extra space below */}
        <label className="font-semibold">{t("regards")}</label>
        <input
          name="user_regards"
          type="text"
          className="bg-transparent outline-none py-1 text-lg"
          aria-label={t("regards")}
        />

        {/* SEND BUTTON */}
        <button
          type="submit"
          disabled={isSending}
          className="bg-primary rounded font-semibold text-white py-3 mt-1 disabled:opacity-60"
        >
          {isSending ? "Gönderiliyor..." : t("send")}
        </button>

        {/* SUCCESS MESSAGE */}
        {success && (
          <div className="text-green-600 font-semibold mt-2">{t("success")}</div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="text-red-600 font-semibold mt-2">{t("fault")}</div>
        )}
      </form>
    </div>
  );
};

export default ContactPage;
