import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">
                Email Doğrulama Gerekli
              </CardTitle>
              <CardDescription>Lütfen email'inizi kontrol edin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Hesabınızı oluşturduk! Email adresinize gönderilen doğrulama linkine tıklayarak hesabınızı aktifleştirin.
              </p>
              
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-600 text-center">
                  🎉 Email onaylama gerekmez! Direkt giriş yapabilirsiniz.
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link href="/auth/login">Hemen Giriş Yap</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/">Ana Sayfaya Dön</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
