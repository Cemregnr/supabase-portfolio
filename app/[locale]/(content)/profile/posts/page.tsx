"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { fetchPosts } from "@/lib/blog";
import { Post } from "@/types/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, Calendar, Edit, Trash2, Plus } from "lucide-react";

export default function MyPostsPage() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      
      const devUser = localStorage.getItem('dev-user');
      if (devUser) {
        try {
          const parsedUser = JSON.parse(devUser);
          setUser(parsedUser);
          
          
          const allPosts = await fetchPosts(true); 
          const userPosts = allPosts.filter(post => 
            post.author_id === parsedUser.email || 
            post.author_id === parsedUser.id
          );
          setPosts(userPosts);
          setLoading(false);
          return;
        } catch (e) {
          console.log('❌ Invalid dev user data');
        }
      }

      
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/auth/login');
        return;
      }

      setUser(user);

      
      const allPosts = await fetchPosts(true);
      const userPosts = allPosts.filter(post => post.author_id === user.id);
      setPosts(userPosts);
      setLoading(false);
    };

    loadData();
  }, [router]);

  const handleDelete = async (postId: string) => {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      
      const devUser = localStorage.getItem('dev-user');
      if (devUser) {
        const devPosts = JSON.parse(localStorage.getItem('dev-blog-posts') || '[]');
        const filteredPosts = devPosts.filter((p: any) => p.id !== postId);
        localStorage.setItem('dev-blog-posts', JSON.stringify(filteredPosts));
        
        
        setPosts(posts.filter(p => p.id !== postId));
        alert('Yazı başarıyla silindi!');
        return;
      }

      const supabase = createClient();
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)
        .eq('author_id', user.id); 

      if (error) {
        console.error('Error deleting post:', error);
        alert('Yazı silinirken hata oluştu.');
      } else {
        setPosts(posts.filter(p => p.id !== postId));
        alert('Yazı başarıyla silindi!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Beklenmeyen bir hata oluştu.');
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
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Yazılarım</h1>
            <p className="text-gray-600">Yazdığınız blog yazılarını yönetin</p>
          </div>
          <Button asChild>
            <Link href="/blog/new">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Yazı
            </Link>
          </Button>
        </div>

        
        {posts.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Henüz yazınız yok</h3>
                <p className="text-gray-600 mb-4">İlk blog yazınızı oluşturmaya hazır mısınız?</p>
                <Button asChild>
                  <Link href="/blog/new">
                    <Plus className="w-4 h-4 mr-2" />
                    İlk Yazınızı Oluşturun
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2 mb-2">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString('tr-TR')}
                        </div>
                        {post.published === false && (
                          <Badge variant="secondary">Taslak</Badge>
                        )}
                        {post.published === true && (
                          <Badge variant="default">Yayınlandı</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/blog/edit/${post.slug}`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-2 mb-4">
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
                          +{post.tags.length - 3} daha
                        </span>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}