import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;
  const errorMessage = params?.error;

  const getFriendlyErrorMessage = (error: string) => {
    if (error?.includes('No token hash or type') || error?.includes('No valid authentication token')) {
      return 'Giriş bağlantısı geçersiz. Lütfen tekrar giriş yapmaya çalışın.';
    }
    if (error?.includes('OAuth')) {
      return 'Google giriş sırasında bir sorun oluştu. E-posta ile giriş yapmayı deneyin.';
    }
    return error || 'Bilinmeyen bir hata oluştu.';
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Bir sorun oluştu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                {getFriendlyErrorMessage(errorMessage)}
              </p>
              
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href="/auth/login">
                    Giriş Sayfasına Dön
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">
                    Ana Sayfaya Git
                  </Link>
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && errorMessage && (
                <details className="mt-4">
                  <summary className="text-xs text-gray-500 cursor-pointer">
                    Geliştirici Detayları
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
                    {errorMessage}
                  </pre>
                </details>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
