import { createClient } from '@/lib/supabase/client';
import { Post, Profile } from '@/types/supabase';
import { devFetchPosts, devCreatePost, devFetchPostBySlug, devUpdatePost, isDevMode } from '@/lib/dev-blog';
import { translationService } from '@/lib/translation';

export async function fetchPosts(includeDrafts = false, locale = 'en'): Promise<Post[]> {
  
  if (isDevMode()) {
    console.log('🔧 Using dev blog system for locale:', locale);
    try {
      const devPosts = await devFetchPosts(includeDrafts, locale);
      console.log('📝 Dev posts loaded:', devPosts.length);
      return devPosts;
    } catch (error) {
      console.error('Dev blog error:', error);
      return [];
    }
  }

  const supabase = createClient();
  
  try {
    let query = supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id (
          full_name,
          avatar_url,
          email
        )
      `);

    
    if (!includeDrafts) {
      query = query.eq('published', true);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      
      
      if (error.message?.includes('relation "blog_posts" does not exist')) {
        console.warn('Blog_posts table does not exist yet. Falling back to dev mode.');
        const devPosts = await devFetchPosts(includeDrafts, locale);
        return devPosts;
      }
      
      return [];
    }

    // Çeviri uygula
    const translatedPosts = await Promise.all(
      (data || []).map(async (post) => {
        return await translationService.translatePost(post, locale);
      })
    );

    return translatedPosts;
  } catch (error) {
    console.error('Unexpected error fetching posts:', error);
    // Fallback to dev mode on error
    try {
      const devPosts = await devFetchPosts(includeDrafts, locale);
      return devPosts;
    } catch (devError) {
      console.error('Dev blog fallback also failed:', devError);
      return [];
    }
  }
}

export async function fetchPostBySlug(slug: string, locale = 'en'): Promise<Post | null> {
  if (isDevMode()) {
    try {
      const devPost = await devFetchPostBySlug(slug);
      return devPost;
    } catch (error) {
      console.error('Dev blog fetchPostBySlug error:', error);
      return null;
    }
  }

  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id (
          full_name,
          avatar_url,
          email
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching post by slug:', error);
      
     
      if (error.message?.includes('relation "blog_posts" does not exist')) {
        const devPost = await devFetchPostBySlug(slug);
        return devPost;
      }
      
      return null;
    }

    // Çeviri uygula
    if (data) {
      const translatedPost = await translationService.translatePost(data, locale);
      return translatedPost;
    }

    return null;
  } catch (error) {
    console.error('Unexpected error fetching post by slug:', error);
    
    try {
      const devPost = await devFetchPostBySlug(slug);
      return devPost;
    } catch (devError) {
      console.error('Dev blog fallback also failed:', devError);
      return null;
    }
  }
}

export async function fetchUserPosts(userId: string): Promise<Post[]> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        profiles:author_id (
          full_name,
          avatar_url,
          email
        )
      `)
      .eq('author_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error fetching user posts:', error);
    return [];
  }
}

export async function createPost(post: {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author_id: string;
  published?: boolean;
  tags?: string[];
  locale?: string;
}): Promise<Post | null> {
  
  if (isDevMode()) {
    try {
      const devPost = await devCreatePost(post);
      return devPost;
    } catch (error) {
      console.error('Dev blog create error:', error);
      return null;
    }
  }

  const supabase = createClient();
  
  try {
   
    const formattedPost = translationService.formatPostForStorage(post, post.locale || 'tr');
    
    
    const postData = {
      title: formattedPost.title,
      content: formattedPost.content,
      excerpt: formattedPost.excerpt,
      slug: post.slug,
      author_id: post.author_id,
      published: post.published || false,
      tags: post.tags || [],
      original_language: post.locale || 'tr',
      auto_translated: false,
      published_at: post.published ? new Date().toISOString() : null
    };

    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select(`
        *,
        profiles:author_id (
          full_name,
          avatar_url,
          email
        )
      `)
      .single();

    if (error) {
      console.error('Error creating post:', error);
      
     
      try {
        const devPost = await devCreatePost(post);
        return devPost;
      } catch (devError) {
        console.error('Dev blog fallback create error:', devError);
        return null;
      }
    }

    
    if (data) {
      try {
        await supabase
          .from('user_posts')
          .insert([{
            user_id: post.author_id,
            post_id: data.id,
            relationship_type: 'author'
          }]);
      } catch (relationError) {
        console.error('Error creating user-post relationship:', relationError);
        
      }
    }

    return data;
  } catch (error) {
    console.error('Unexpected error creating post:', error);
    
    
    try {
      const devPost = await devCreatePost(post);
      return devPost;
    } catch (devError) {
      console.error('Dev blog fallback create error:', devError);
      return null;
    }
  }
}

export async function updatePost(id: string, updates: {
  title?: string;
  content?: string;
  excerpt?: string;
  published?: boolean;
  tags?: string[];
}): Promise<Post | null> {
  
  if (isDevMode()) {
    try {
      const updatedPost = await devUpdatePost(id, updates);
      return updatedPost;
    } catch (error) {
      console.error('Dev blog update error:', error);
      return null;
    }
  }
  
  const supabase = createClient();
  
  try {
    const updateData: any = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    
    if (updates.published === true) {
      updateData.published_at = new Date().toISOString();
    } else if (updates.published === false) {
      updateData.published_at = null;
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        profiles:author_id (
          full_name,
          avatar_url,
          email
        )
      `)
      .single();

    if (error) {
      console.error('Error updating post:', error);
      
      
      try {
        const devPost = await devUpdatePost(id, updates);
        return devPost;
      } catch (devError) {
        console.error('Dev blog update fallback error:', devError);
        return null;
      }
    }

    return data;
  } catch (error) {
    console.error('Unexpected error updating post:', error);
    return null;
  }
}

export async function deletePost(id: string, userId: string): Promise<boolean> {
  const supabase = createClient();
  
  try {
    
    await supabase
      .from('user_posts')
      .delete()
      .eq('post_id', id);

   
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
      .eq('author_id', userId);

    if (error) {
      console.error('Error deleting post:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error deleting post:', error);
    return false;
  }
}


export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching profile:', error);
    return null;
  }
}

export async function updateProfile(userId: string, updates: {
  full_name?: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  country?: string;
}): Promise<Profile | null> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error updating profile:', error);
    return null;
  }
}

export async function createUserProfile(userId: string, email: string, fullName?: string): Promise<Profile | null> {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([{
        id: userId,
        email: email,
        full_name: fullName || email.split('@')[0]
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error creating user profile:', error);
    return null;
  }
}


export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') 
    .replace(/[\s_-]+/g, '-') 
    .replace(/^-+|-+$/g, ''); 
}