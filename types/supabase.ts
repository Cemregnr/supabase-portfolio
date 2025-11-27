export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string;
          slug: string;
          author_id: string;
          created_at: string;
          updated_at: string;
          published: boolean;
          tags: string[];
        };
        Insert: {
          title: string;
          content: string;
          excerpt: string;
          slug: string;
          author_id: string;
          published?: boolean;
          tags?: string[];
        };
        Update: {
          title?: string;
          content?: string;
          excerpt?: string;
          slug?: string;
          published?: boolean;
          tags?: string[];
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          avatar_url: string | null;
          bio: string | null;
          website: string | null;
          country: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          bio?: string | null;
          website?: string | null;
          country?: string | null;
        };
        Update: {
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          bio?: string | null;
          website?: string | null;
          country?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Post = Database['public']['Tables']['posts']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];