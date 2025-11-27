"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { devFetchPostBySlug } from "@/lib/dev-blog";
import { Post } from "@/types/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Trash2, Edit } from "lucide-react";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Create dev user if doesn't exist
    let devUser = localStorage.getItem('dev-user');
    if (!devUser) {
      const user = {
        email: 'dev-user@example.com',
        id: 'dev-user@example.com',
        name: 'Cemre Güner'
      };
      localStorage.setItem('dev-user', JSON.stringify(user));
      setCurrentUser(user);
      console.log('✅ Created dev user for editing');
    } else {
      try {
        const parsedUser = JSON.parse(devUser);
        setCurrentUser(parsedUser);
        console.log('✅ Dev user found:', parsedUser.email);
      } catch (e) {
        console.log('❌ Invalid dev user data');
        localStorage.removeItem('dev-user');
      }
    }
  }, []);

  useEffect(() => {
    async function loadPost() {
      try {
        const foundPost = await devFetchPostBySlug(slug);
        setPost(foundPost);
        console.log('📄 Post loaded:', foundPost?.title || 'Not found');
      } catch (error) {
        console.error("Error loading post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [slug]);

  const handleDelete = async () => {
    if (!post || !currentUser) return;
    
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      // Development environment - delete from localStorage
      const devUser = localStorage.getItem('dev-user');
      if (devUser) {
        const devPosts = JSON.parse(localStorage.getItem('dev-posts') || '[]');
        const filteredPosts = devPosts.filter((p: any) => p.id !== post.id);
        localStorage.setItem('dev-posts', JSON.stringify(filteredPosts));
        
        alert('Post successfully deleted!');
        router.push(`/${params.locale}/blog`);
        return;
      }

      // Supabase delete (future implementation)
      alert('Post successfully deleted!');
      router.push(`/${params.locale}/blog`);
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred.');
    }
  };

  // Check if user can edit/delete post
  const canDeletePost = currentUser && post && (
    post.author_id === currentUser.email || 
    post.author_id === currentUser.id ||
    currentUser.email === 'dev-user@example.com' // Always allow dev user
  );

  // Debug logging
  useEffect(() => {
    if (currentUser && post) {
      console.log('👤 Current user:', currentUser);
      console.log('📝 Post author:', post.author_id);
      console.log('✅ Can edit:', canDeletePost);
    }
  }, [currentUser, post, canDeletePost]);

  if (loading) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => router.push(`/${params.locale}/blog`)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        {/* Geri dön butonu */}
        <div className="mb-6">
          <Button
            onClick={() => router.push(`/${params.locale}/blog`)}
            variant="outline"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to blog
          </Button>
        </div>

        {/* Post header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-2 mb-4">
              {post.published === false && (
                <Badge variant="secondary">Draft</Badge>
              )}
              {post.tags?.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <CardTitle className="text-3xl font-bold mb-4">
              {post.title}
            </CardTitle>
            
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{(post as any)?.profiles?.full_name || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Post content */}
        <Card>
          <CardContent className="pt-6">
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed space-y-4">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph.split('\n').map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {line}
                        {lineIndex < paragraph.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation footer */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex justify-between items-center">
            <Button
              onClick={() => router.push(`/${params.locale}/blog`)}
              variant="outline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              All blog posts
            </Button>
            
            <div className="flex items-center gap-4">
              {post.published === false && (
                <Badge variant="secondary">
                  This post is still a draft
                </Badge>
              )}
              
              {/* Sadece yazının sahibi silme ve düzenleme yapabilir */}
              {canDeletePost && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/${params.locale}/blog/${post.slug}/edit`)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  
                  {post.published === false && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleDelete}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}