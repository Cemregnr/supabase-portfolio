// Development ortamı için local blog storage
const DEV_POSTS = new Map();
let POST_ID_COUNTER = 1;

export function isDevMode() {
  return process.env.NODE_ENV === 'development' || typeof window !== 'undefined';
}

// Kullanıcının post'u düzenleme/silme yetkisi var mı kontrol et
export function canUserEditPost(post: any, currentUser: any): boolean {
  if (!currentUser || !post) return false;
  
  return post.author_id === currentUser.email || 
         post.author_id === currentUser.id;
}

// Mevcut kullanıcıyı getir
export function getCurrentUser(): any | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const devUser = localStorage.getItem('dev-user');
    if (devUser) {
      return JSON.parse(devUser);
    }
  } catch (e) {
    console.error('Error getting current user:', e);
  }
  
  return null;
}

export async function clearSamplePosts() {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = localStorage.getItem('dev-posts');
    if (saved) {
      const posts = JSON.parse(saved);
      // Sadece sample olmayan postları tut
      const userPosts = posts.filter((post: any) => !post.isSample && !post.id.includes('sample'));
      localStorage.setItem('dev-posts', JSON.stringify(userPosts));
      console.log('🧹 Sample posts cleared, kept user posts:', userPosts.length);
    }
  } catch (error) {
    console.error('Error clearing sample posts:', error);
  }
}

export async function devCreatePost(postData: {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author_id: string;
  published?: boolean;
  tags?: string[];
  locale?: string;
}) {
  if (!isDevMode()) {
    throw new Error('Dev posts only work in development');
  }

  const postId = `dev-post-${POST_ID_COUNTER++}`;
  const now = new Date().toISOString();
  
  // Get author name from localStorage
  let authorName = 'Cemre Güner';
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('dev-user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const profileData = localStorage.getItem(`dev-profile-${user.email}`);
        if (profileData) {
          const profile = JSON.parse(profileData);
          if (profile.fullName && profile.fullName.trim()) {
            authorName = profile.fullName;
          } else {
            authorName = user.email ? user.email.split('@')[0] : 'Anonymous User';
          }
        } else {
          authorName = user.email ? user.email.split('@')[0] : 'Anonymous User';
        }
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
  }

  // Create English-only post
  const post = {
    id: postId,
    title: postData.title,
    content: postData.content,
    excerpt: postData.excerpt,
    author: authorName,
    author_id: postData.author_id,
    created_at: now,
    createdAt: now,
    updated_at: now,
    published: postData.published !== false,
    tags: postData.tags || [],
    slug: postData.slug,
    isSample: false,
    availableLocales: ['en'],
    locale: 'en',
    profiles: {
      id: postData.author_id,
      full_name: authorName,
      avatar_url: null
    }
  };

  // Save to localStorage
  if (typeof window !== 'undefined') {
    try {
      const existing = localStorage.getItem('dev-posts');
      const posts = existing ? JSON.parse(existing) : [];
      posts.push(post);
      localStorage.setItem('dev-posts', JSON.stringify(posts));
      console.log('✅ Post created successfully:', post.id);
    } catch (error) {
      console.error('Error saving post:', error);
      throw new Error('Failed to save post');
    }
  }

  return post;
}

export async function devUpdatePost(postId: string, updateData: {
  title?: string;
  content?: string;
  excerpt?: string;
  published?: boolean;
  tags?: string[];
}) {
  if (!isDevMode()) {
    throw new Error('Dev posts only work in development');
  }

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('dev-posts');
      if (saved) {
        const posts = JSON.parse(saved);
        const updatedPosts = posts.map((post: any) => {
          if (post.id === postId) {
            return {
              ...post,
              ...updateData,
              updated_at: new Date().toISOString()
            };
          }
          return post;
        });
        
        localStorage.setItem('dev-posts', JSON.stringify(updatedPosts));
        console.log('✅ Post updated successfully:', postId);
        
        return updatedPosts.find((p: any) => p.id === postId);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('Failed to update post');
    }
  }
  
  throw new Error('Post not found');
}

export async function devFetchPosts(includeDrafts = false, locale = 'en') {
  if (!isDevMode()) {
    console.log('❌ Not in dev mode, returning empty array');
    return [];
  }

  console.log('🔍 devFetchPosts called with:', { includeDrafts, locale });

  
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('dev-posts');
      console.log('💾 Raw localStorage data:', saved ? 'Found' : 'Not found');
      
      if (saved) {
        const posts = JSON.parse(saved);
        console.log('📄 Posts parsed from localStorage:', posts.length);
        
        const userPosts = posts;
        
       
        const getLocalizedField = (field: any) => {
          if (typeof field === 'string') return field;
          if (typeof field === 'object' && field !== null) {
            return field['en'] || Object.values(field)[0];
          }
          return field;
        };

        
        const processedPosts = userPosts
          .filter((post: any) => includeDrafts || post.published !== false)
          .map((post: any) => ({
            ...post,
            title: getLocalizedField(post.title),
            content: getLocalizedField(post.content),
            excerpt: getLocalizedField(post.excerpt),
            author: post.author || post.profiles?.full_name || 'Anonymous',
            created_at: post.created_at || post.createdAt,
            availableLocales: ['en'],
            locale: 'en'
          }))
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        console.log('✅ Processed posts:', processedPosts.length);
        return processedPosts;
      }
    } catch (error) {
      console.error('Error fetching dev posts:', error);
    }
  }

  console.log('📋 Returning empty array');
  return [];
}

export async function devFetchPostBySlug(slug: string, locale = 'en') {
  if (!isDevMode()) {
    console.log('❌ Not in dev mode, returning null');
    return null;
  }

  console.log('🔍 devFetchPostBySlug called with slug:', slug);

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('dev-posts');
      if (saved) {
        const posts = JSON.parse(saved);
        
        // Önce slug ile ara
        let post = posts.find((p: any) => p.slug === slug);
        
        // Bulamazsa title'dan slug oluşturup ara
        if (!post) {
          post = posts.find((p: any) => {
            const title = typeof p.title === 'string' ? p.title : p.title?.en || p.title?.tr || '';
            const generatedSlug = title
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
              .trim();
            return generatedSlug === slug;
          });
        }
        
        // Son çare: id ile ara
        if (!post) {
          post = posts.find((p: any) => p.id === slug);
        }
        
        if (post) {
         
          const getLocalizedField = (field: any) => {
            if (typeof field === 'string') return field;
            if (typeof field === 'object' && field !== null) {
              return field['en'] || Object.values(field)[0];
            }
            return field;
          };

          const processedPost = {
            ...post,
            title: getLocalizedField(post.title),
            content: getLocalizedField(post.content),
            excerpt: getLocalizedField(post.excerpt),
            author: post.author || post.profiles?.full_name || 'Anonymous',
            created_at: post.created_at || post.createdAt,
            availableLocales: ['en'],
            locale: 'en'
          };

          console.log('✅ Post found and processed:', processedPost.title);
          return processedPost;
        }
      }
    } catch (error) {
      console.error('Error fetching post by slug:', error);
    }
  }

  console.log('❌ Post not found for slug:', slug);
  return null;
}

export async function devDeletePost(postId: string) {
  if (!isDevMode()) {
    throw new Error('Dev posts only work in development');
  }

  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('dev-posts');
      if (saved) {
        const posts = JSON.parse(saved);
        const updatedPosts = posts.filter((post: any) => post.id !== postId);
        localStorage.setItem('dev-posts', JSON.stringify(updatedPosts));
        console.log('✅ Post deleted successfully:', postId);
        return true;
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }
  
  return false;
}