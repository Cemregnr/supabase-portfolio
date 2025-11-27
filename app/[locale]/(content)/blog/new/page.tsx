"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { createPost, generateSlug } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NewPostPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations('Blog.newPost');
  const [locale, setLocale] = useState('tr');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [published, setPublished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  
  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setLocale(resolvedParams.locale || 'tr');
    };
    getParams();
  }, [params]);

  useEffect(() => {
    const checkAuth = async () => {
      
      const devUser = localStorage.getItem('dev-user');
      if (devUser) {
        try {
          const parsedDevUser = JSON.parse(devUser);
          console.log('✅ Dev user found:', parsedDevUser.email);
          setUser(parsedDevUser);
          
          
          const profileData = localStorage.getItem(`dev-profile-${parsedDevUser.email}`);
          if (profileData) {
            const profile = JSON.parse(profileData);
            if (profile.fullName) {
              setAuthorName(profile.fullName);
            }
            if (profile.avatarUrl) {
              setAuthorAvatar(profile.avatarUrl);
            }
          }
          return; 
        } catch (e) {
          console.error('Dev user parse error:', e);
          localStorage.removeItem('dev-user');
        }
      }
      
      
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        console.log('✅ Supabase user found:', user.email);
        setUser(user);
        
        // Load user profile for author info
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profile) {
            if (profile.full_name) {
              setAuthorName(profile.full_name);
            }
            if (profile.avatar_url) {
              setAuthorAvatar(profile.avatar_url);
            }
          }
        } catch (error) {
          console.log('Profile not found, using user email as author');
          setAuthorName(user.email || 'Anonymous User');
        }
      } else {
        // No auth required - allow anonymous posting with guest user
        console.log('⚠️ No authenticated user, creating guest user');
        const guestUser = {
          email: 'guest@example.com',
          id: 'guest-user',
          name: 'Guest User'
        };
        setUser(guestUser);
        setAuthorName('Guest User');
      }
      
      
      const savedTags = localStorage.getItem('user-tags');
      if (savedTags) {
        try {
          const parsedTags = JSON.parse(savedTags);
          setTagSuggestions(parsedTags);
        } catch (e) {
          console.error('Error loading saved tags:', e);
        }
      } else {
        
        const defaultEducationTags = [
          'English Learning', 'Grammar Tips', 'Vocabulary Building', 'Speaking Practice',
          'Language Teaching', 'ESL Methods', 'Pronunciation Guide', 'Reading Comprehension',
          'Writing Skills', 'Listening Practice', 'Language Acquisition', 'Teaching Strategies',
          'Educational Technology', 'Student Motivation', 'Classroom Management', 'Curriculum Design',
          'Language Assessment', 'Cultural Awareness', 'Interactive Learning', 'Online Education',
          'Adult Learning', 'Young Learners', 'Business English', 'Academic English',
          'IELTS Preparation', 'TOEFL Tips', 'Language Games', 'Study Techniques',
          'Turkish Language', 'Language Exchange', 'Pronunciation Practice', 'Fluency Building'
        ];
        setTagSuggestions(defaultEducationTags);
      }
      
      
      if (user && user.id !== 'guest-user') {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', user.id)
            .single();
          
          if (profile) {
            if (profile.full_name) {
              setAuthorName(profile.full_name);
            }
            if (profile.avatar_url) {
              setAuthorAvatar(profile.avatar_url);
            }
          }
        } catch (e) {
          console.error('Error loading profile:', e);
        }
      }
    };
    checkAuth();
  }, [router]);

  const handleTagInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleTagInputBlur = () => {
    
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const addSuggestedTag = (tag: string) => {
    const currentTags = tags.split(',').map(t => t.trim()).filter(t => t);
    if (!currentTags.includes(tag)) {
      const newTags = [...currentTags, tag].join(', ');
      setTags(newTags);
    }
    setShowSuggestions(false);
  };

  const filteredSuggestions = tagSuggestions.filter(tag => {
    const currentTags = tags.split(',').map(t => t.trim()).filter(t => t);
    return !currentTags.includes(tag) && tag.toLowerCase().includes(tags.toLowerCase());
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    
    if (!title.trim()) {
      setError('Başlık gereklidir / Title is required');
      return;
    }
    
    if (!content.trim()) {
      setError('İçerik gereklidir / Content is required');
      return;
    }
    
    if (!tags.trim()) {
      setError('En az bir etiket gereklidir / At least one tag is required');
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const slug = generateSlug(title);
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      
      
      if (tagsArray.length > 0) {
        const existingTags = JSON.parse(localStorage.getItem('user-tags') || '[]');
        const allTags = [...new Set([...existingTags, ...tagsArray])];
        localStorage.setItem('user-tags', JSON.stringify(allTags));
        setTagSuggestions(allTags);
      }
      
      
      let authorId = user.id;
      const devUser = localStorage.getItem('dev-user');
      if (devUser) {
        try {
          const parsedDevUser = JSON.parse(devUser);
          authorId = parsedDevUser.email; // Dev ortamında email kullan
        } catch (e) {
          console.error('Dev user parse error:', e);
        }
      }

      const newPost = await createPost({
        title,
        content,
        excerpt: excerpt || content.slice(0, 150) + '...',
        slug,
        author_id: authorId,
        published,
        tags: tagsArray,
        locale
      });

      console.log('✅ Post creation result:', newPost);
      
      if (newPost) {
        console.log('✅ Post created successfully, redirecting to blog...');
        
        alert(published ? t('publishSuccess') : t('draftSuccess'));
        router.push(`/${locale}/blog`);
      } else {
        console.error('❌ Post creation returned null');
        setError(t('createPostError'));
      }
    } catch (err) {
      setError(t('generalError'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-xl">{t('checkingAuth')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
       
        <div className="flex items-center gap-4 mb-8">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t('backButton')}
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {t('title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('postDetails')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              
              <div className="space-y-2">
                <Label htmlFor="title">
                  {t('titleLabel')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder={t('titlePlaceholder')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className={`text-lg ${
                    !title.trim() && error && error.includes('Başlık') 
                      ? 'border-red-500 bg-red-50' 
                      : ''
                  }`}
                />
                {!title.trim() && error && error.includes('Başlık') && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              
              <div className="space-y-2">
                <Label htmlFor="excerpt">{t('excerptLabel')}</Label>
                <Input
                  id="excerpt"
                  type="text"
                  placeholder={t('excerptPlaceholder')}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  {t('excerptHelp')}
                </p>
              </div>

              
              <div className="space-y-2">
                <Label htmlFor="content">
                  {t('contentLabel')} <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="content"
                  placeholder={t('contentPlaceholder')}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={12}
                  className={`w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-y ${
                    !content.trim() && error && error.includes('İçerik')
                      ? 'border-red-500 bg-red-50'
                      : ''
                  }`}
                />
                {!content.trim() && error && error.includes('İçerik') && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t('authorLabel')}</Label>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (!authorName) {
                        // Kullanıcı profil bilgilerini yükle
                        const devUser = localStorage.getItem('dev-user');
                        if (devUser) {
                          try {
                            const parsedDevUser = JSON.parse(devUser);
                            const profileData = localStorage.getItem(`dev-profile-${parsedDevUser.email}`);
                            if (profileData) {
                              const profile = JSON.parse(profileData);
                              if (profile.fullName) {
                                setAuthorName(profile.fullName);
                                if (profile.avatarUrl) {
                                  setAuthorAvatar(profile.avatarUrl);
                                }
                              } else {
                                alert(t('completeProfileMessage'));
                              }
                            } else {
                              alert('Lütfen önce profil sayfasından adınızı ve soyadınızı kaydedin.');
                            }
                          } catch (e) {
                            console.error('Error:', e);
                          }
                        }
                      }
                    }}
                  >
                    {t('addAuthorButton')}
                  </Button>
                </div>
                
                {authorName && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {authorAvatar ? (
                        <img src={authorAvatar} alt="Author" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-600 text-sm font-medium">
                          {authorName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{authorName}</p>
                      <p className="text-sm text-gray-500">{t('authorRole')}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setAuthorName('');
                        setAuthorAvatar('');
                      }}
                    >
                      {t('removeButton')}
                    </Button>
                  </div>
                )}
              </div>

              
              <div className="space-y-2 relative">
                <Label htmlFor="tags">
                  {t('tagsLabel')} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tags"
                  type="text"
                  placeholder={t('tagsPlaceholder')}
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  onFocus={handleTagInputFocus}
                  onBlur={handleTagInputBlur}
                  required
                  className={
                    !tags.trim() && error && error.includes('etiket')
                      ? 'border-red-500 bg-red-50'
                      : ''
                  }
                />
                {!tags.trim() && error && error.includes('etiket') && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
                
                
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
                    {filteredSuggestions.slice(0, 8).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 border-b last:border-b-0"
                        onMouseDown={() => addSuggestedTag(tag)}
                      >
                        <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                
                <p className="text-sm text-gray-500">
                  {t('tagsHelp')}
                </p>
              </div>

              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={published}
                  onCheckedChange={(checked) => setPublished(checked as boolean)}
                />
                <Label
                  htmlFor="published"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('publishImmediatelyLabel')}
                </Label>
              </div>

              
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading || !title || !content}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    t('creatingButton')
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {published ? t('publishButton') : t('saveDraftButton')}
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/blog')}
                >
                  {t('cancelButton')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}