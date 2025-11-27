-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    website TEXT,
    country TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title JSONB NOT NULL, 
    content JSONB NOT NULL,
    excerpt JSONB, 
    slug TEXT UNIQUE NOT NULL,
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT '{}',
    featured_image TEXT,
    meta_description JSONB, 
    original_language TEXT DEFAULT 'tr', 
    auto_translated BOOLEAN DEFAULT FALSE, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    
    
    CONSTRAINT blog_posts_slug_key UNIQUE (slug)
);


CREATE TABLE IF NOT EXISTS public.user_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE NOT NULL,
    relationship_type TEXT NOT NULL DEFAULT 'author', 
    
    
    UNIQUE(user_id, post_id, relationship_type)
);


CREATE INDEX IF NOT EXISTS blog_posts_author_id_idx ON public.blog_posts(author_id);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON public.blog_posts(published);
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON public.blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS user_posts_user_id_idx ON public.user_posts(user_id);
CREATE INDEX IF NOT EXISTS user_posts_post_id_idx ON public.user_posts(post_id);


ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_posts ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Published blog posts are viewable by everyone" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can insert their own blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can update their own blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can delete their own blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Users can view their own relationships" ON public.user_posts;
DROP POLICY IF EXISTS "Users can insert their own relationships" ON public.user_posts;
DROP POLICY IF EXISTS "Users can update their own relationships" ON public.user_posts;
DROP POLICY IF EXISTS "Users can delete their own relationships" ON public.user_posts;


CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT 
    USING (true);

CREATE POLICY "Users can insert their own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);


CREATE POLICY "Published blog posts are viewable by everyone" 
    ON public.blog_posts FOR SELECT 
    USING (published = true OR auth.uid() = author_id);

CREATE POLICY "Users can insert their own blog posts" 
    ON public.blog_posts FOR INSERT 
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own blog posts" 
    ON public.blog_posts FOR UPDATE 
    USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own blog posts" 
    ON public.blog_posts FOR DELETE 
    USING (auth.uid() = author_id);


CREATE POLICY "Users can view their own relationships" 
    ON public.user_posts FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own relationships" 
    ON public.user_posts FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own relationships" 
    ON public.user_posts FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own relationships" 
    ON public.user_posts FOR DELETE 
    USING (auth.uid() = user_id);


CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();