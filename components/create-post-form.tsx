"use client";

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { createPost, generateSlug } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CreatePostFormProps {
  onCancel?: () => void;
}

export function CreatePostForm({ onCancel }: CreatePostFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    slug: '',
    tags: [] as string[],
    published: false
  });
  const [currentTag, setCurrentTag] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent, publish = false) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let userId = '';
      let userEmail = '';

     
      const devUser = localStorage.getItem('dev-user');
      if (devUser) {
        try {
          const parsedUser = JSON.parse(devUser);
          userId = parsedUser.id;
          userEmail = parsedUser.email;
          console.log('✅ Dev user found for post creation:', userEmail);
        } catch (e) {
          console.log('❌ Invalid dev user data');
          localStorage.removeItem('dev-user');
        }
      }

      
      if (!userId) {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error('Giriş yapmanız gerekiyor');
        }

        userId = user.id;
        userEmail = user.email || '';
      }

      if (!formData.title || !formData.content) {
        throw new Error('Başlık ve içerik gereklidir');
      }

      console.log('📝 Creating post with user:', userEmail);

      await createPost({
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || formData.content.substring(0, 150) + '...',
        slug: formData.slug,
        author_id: userId,
        published: publish,
        tags: formData.tags
      });

      router.push('/blog');
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Yeni Blog Yazısı Oluştur</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
          {error && (
            <div className="text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="title">Başlık *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Blog yazınızın başlığı"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-friendly-slug"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="excerpt">Özet</Label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Blog yazınızın kısa özeti (boş bırakılırsa otomatik oluşturulur)"
              className="min-h-20 p-2 border rounded-md resize-none"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">İçerik *</Label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Blog yazınızın içeriği..."
              className="min-h-[300px] p-3 border rounded-md resize-none font-mono text-sm"
              rows={15}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Etiketler</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Etiket ekle"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1"
              />
              <Button type="button" onClick={addTag} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              variant="outline"
            >
              {loading ? 'Kaydediliyor...' : 'Taslak Olarak Kaydet'}
            </Button>
            <Button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={loading}
            >
              {loading ? 'Yayınlanıyor...' : 'Yayınla'}
            </Button>
            {onCancel && (
              <Button type="button" onClick={onCancel} variant="ghost">
                İptal
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}