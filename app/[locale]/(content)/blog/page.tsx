"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { fetchPosts } from '@/lib/blog';
import { Post } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Plus, Calendar, User, Edit, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { canUserEditPost, getCurrentUser, clearSamplePosts, devFetchPosts } from '@/lib/dev-blog';
import { clearAllSamplePosts, createFreshEnglishPosts } from '@/lib/clear-sample-posts';

export default function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations('Blog');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showDrafts, setShowDrafts] = useState(false);
  const [locale, setLocale] = useState('en');

  
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale || 'en');
      console.log('🌍 Blog page locale set to:', resolvedParams.locale || 'en');
    };
    getParams();
  }, [params]);

  useEffect(() => {
    
    clearAllSamplePosts();
    createFreshEnglishPosts();
    
    
    if (typeof window !== 'undefined') {
      const event = new StorageEvent('storage', {
        key: 'dev-posts',
        newValue: localStorage.getItem('dev-posts'),
        storageArea: localStorage
      });
      window.dispatchEvent(event);
    }
    
   
    const checkAuth = async () => {
      console.log('📝 Blog: Starting auth check...');
      
      let devUser = localStorage.getItem('dev-user');
      if (!devUser) {
        const user = {
          email: 'dev-user@example.com',
          id: 'dev-user@example.com',
          name: 'Cemre Güner'
        };
        localStorage.setItem('dev-user', JSON.stringify(user));
        setUser(user);
        console.log('✅ Blog: Created dev user for editing:', user.email);
        return;
      }
      
      if (devUser) {
        try {
          const parsedUser = JSON.parse(devUser);
          console.log('✅ Blog: Dev user found:', parsedUser.email);
          setUser(parsedUser);
          return;
        } catch (e) {
          console.log('❌ Blog: Invalid dev user data');
          localStorage.removeItem('dev-user');
        }
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        console.log('✅ Blog: Supabase user found:', user.email);
        setUser(user);
      } else {
        console.log('❌ Blog: No authenticated user found');
        setUser(null);
      }
    };

    checkAuth();

    
    const loadPosts = async () => {
      console.log('🔍 Loading posts for locale:', locale);
      
      
      const devPosts = localStorage.getItem('dev-posts');
      if (devPosts) {
        try {
          const parsedPosts = JSON.parse(devPosts);
          console.log('💾 Found', parsedPosts.length, 'posts in localStorage');
          console.log('💾 Posts:', parsedPosts.map((p: any) => ({ id: p.id, title: p.title, published: p.published })));
        } catch (e) {
          console.error('Error parsing localStorage posts:', e);
        }
      } else {
        console.log('💾 No posts found in localStorage');
      }
      
      
      const fetchedPosts = await fetchPosts(showDrafts, locale);
      console.log(`📄 Posts loaded with translation for ${locale}:`, fetchedPosts.length);
      setPosts(fetchedPosts);
      setLoading(false);
    };
    
    loadPosts();
  }, [showDrafts, locale]);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-xl">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {t('title')}
            </h1>
          </div>
          
          {user && (
            <div className="flex items-center gap-4">
              <Button
                variant={showDrafts ? "default" : "outline"}
                size="sm"
                onClick={() => setShowDrafts(!showDrafts)}
              >
                {showDrafts ? t('hideDrafts') : t('showDrafts')}
              </Button>
              <Link href={`/${locale}/blog/new`}>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  {t('createPost')}
                </Button>
              </Link>
            </div>
          )}
        </div>

        
        {!user && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">{t('authCta')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('loginToCreate')}
                </p>
                <div className="space-x-4">
                  <Link href="/auth/sign-up">
                    <Button variant="default">{t('signUp')}</Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="outline">{t('logIn')}</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        
        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">{t('noPosts')}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t('beFirst')}
                </p>
                {user && (
                  <Link href="/blog/new">
                    <Button>{t('createFirstPost')}</Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                    <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                      {post.published === false && (
                        <Badge variant="secondary" className="ml-2 shrink-0">{t('draft')}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {(() => {
                          // Önce profil bilgisinden yazar adını almaya çalış
                          if (post.author_id) {
                            const profileData = localStorage.getItem(`dev-profile-${post.author_id}`);
                            if (profileData) {
                              try {
                                const profile = JSON.parse(profileData);
                                if (profile.fullName) {
                                  return profile.fullName;
                                }
                              } catch (e) {
                                console.error('Profile parse error:', e);
                              }
                            }
                          }
                          
                          return (post as any)?.profiles?.full_name || t('author');
                        })()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {post.excerpt}
                    </p>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{post.tags.length - 3} {t('more')}
                          </span>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
