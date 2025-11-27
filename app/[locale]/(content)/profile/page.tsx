"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, MapPin, Camera, Save } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        
        // Current session'ı kontrol et
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          router.push('/auth/login');
          return;
        }

        setUser(session.user);
        
        // Profile bilgilerini yükle
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          setFullName(profile.full_name || '');
          setCountry(profile.country || '');
          setAvatarUrl(profile.avatar_url || '');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Auth error:', error);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    
    try {
      let finalAvatarUrl = avatarUrl;

      // Avatar dosyası yüklendiyse base64'e çevir
      if (avatarFile) {
        finalAvatarUrl = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(avatarFile);
        });
      }

      const supabase = createClient();
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          country: country,
          avatar_url: finalAvatarUrl,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving profile:', error);
        alert('Profil güncellenirken hata oluştu.');
      } else {
        setAvatarUrl(finalAvatarUrl);
        setAvatarFile(null);
        alert('Profil başarıyla güncellendi!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Beklenmeyen bir hata oluştu.');
    }

    setSaving(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        alert('Dosya boyutu 2MB\'dan küçük olmalıdır.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Sadece resim dosyaları yüklenebilir.');
        return;
      }
      setAvatarFile(file);
      
      
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profil Ayarları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-lg text-gray-600">
                    {fullName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="avatar">Profil Resmi</Label>
                <div className="flex gap-2">
                  <input
                    type="file"
                    id="avatar-file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('avatar-file')?.click()}
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Resim Yükle
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setAvatarUrl("");
                      setAvatarFile(null);
                    }}
                    disabled={!avatarUrl}
                  >
                    Sil
                  </Button>
                </div>
                <p className="text-xs text-gray-500">JPG, PNG (Max 2MB)</p>
              </div>
            </div>

           
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  value={user.email || ''}
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>

            
            <div className="space-y-2">
              <Label htmlFor="fullName">Ad Soyad</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Adınız ve soyadınız"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Ülke</Label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <Input
                  id="country"
                  type="text"
                  placeholder="Hangi ülkede yaşıyorsunuz?"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </div>

            
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Kaydediliyor...' : 'Profili Kaydet'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}