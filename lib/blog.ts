import { createClient } from '@/lib/supabase/client';
import { Post } from '@/types/supabase';

export async function fetchPosts(): Promise<Post[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:author_id (
        full_name,
        avatar_url
      )
    `)
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
}

export async function fetchUserPosts(userId: string): Promise<Post[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user posts:', error);
    return [];
  }

  return data || [];
}

export async function createPost(post: {
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author_id: string;
  published?: boolean;
  tags?: string[];
}): Promise<Post | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    return null;
  }

  return data;
}

export async function updatePost(id: string, updates: {
  title?: string;
  content?: string;
  excerpt?: string;
  published?: boolean;
  tags?: string[];
}): Promise<Post | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    return null;
  }

  return data;
}

export async function deletePost(id: string, userId: string): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .eq('author_id', userId);

  if (error) {
    console.error('Error deleting post:', error);
    return false;
  }

  return true;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}