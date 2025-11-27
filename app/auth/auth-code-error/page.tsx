import Link from "next/link";
import { Suspense } from "react";

function ErrorContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">Giriş Hatası</h1>
        <p className="mb-4 text-gray-600">
          Giriş işlemi sırasında bir hata oluştu. Bu genellikle:
        </p>
        <ul className="text-sm text-gray-500 mb-6 text-left">
          <li>• Google OAuth ayarları eksik</li>
          <li>• Callback URL yanlış yapılandırılmış</li>
          <li>• Session süresi dolmuş</li>
        </ul>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/auth/login"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tekrar Dene
          </Link>
          <Link 
            href="/"
            className="inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Ana Sayfa
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthCodeError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}