
export const samplePosts = [
  {
    id: "dev-post-1",
    title: {
      tr: "İlk Blog Yazım - Kendimi Tanıtıyorum",
      en: "My First Blog Post - Introducing Myself"
    },
    content: {
      tr: "Merhaba! Ben Cemre Güner. Bu benim ilk blog yazım ve burada kendimi tanıtmak istiyorum. Web geliştirme, özellikle React ve Next.js teknolojileri konusunda tutkulu bir geliştiriciyim. Bu blogda teknoloji, yazılım geliştirme ve öğrendiklerimi paylaşacağım. Ayrıca eğitim konularında da yazılar yazmayı planlıyorum. Umarım içeriklerim faydalı olur!",
      en: "Hello! I'm Cemre Güner. This is my first blog post and I want to introduce myself here. I'm a passionate developer focused on web development, especially React and Next.js technologies. In this blog, I'll share about technology, software development, and my learnings. I also plan to write articles about education. I hope my content will be useful!"
    },
    excerpt: {
      tr: "İlk blog yazımda kendimi tanıtıyor ve bu blogda neler paylaşacağımı anlatıyorum. Web geliştirme ve eğitim konularında içerikler bulacaksınız.",
      en: "In my first blog post, I introduce myself and explain what I'll share on this blog. You'll find content about web development and education."
    },
    slug: "ilk-blog-yazim",
    author_id: "user@example.com",
    published: true,
    tags: ["blog", "tanıtım", "giriş"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    locale: "tr",
    availableLocales: ["tr", "en"],
    profiles: {
      id: "user@example.com",
      full_name: "Cemre Güner",
      avatar_url: null
    }
  },
  {
    id: "dev-post-2", 
    title: {
      tr: "Modern Web Geliştirme: React ve Next.js Rehberi",
      en: "Modern Web Development: A Guide to React and Next.js"
    },
    content: {
      tr: "Modern web geliştirmede React ve Next.js, endüstrinin en popüler teknolojileri haline geldi. Bu yazıda, neden bu teknolojileri tercih etmemiz gerektiğini ve nasıl etkili bir şekilde kullanabileceğimizi inceleyeceğiz. React'in component-based yapısı sayesinde kod tekrarını minimize edebilir, Next.js'in sunduğu SSR (Server-Side Rendering) ve SSG (Static Site Generation) özelliklerini kullanarak performanslı uygulamalar geliştirebiliriz. Ayrıca TypeScript entegrasyonu ile tip güvenliği sağlayarak daha güvenilir kodlar yazabiliriz.",
      en: "In modern web development, React and Next.js have become the industry's most popular technologies. In this article, we'll explore why we should choose these technologies and how to use them effectively. With React's component-based structure, we can minimize code repetition, and using Next.js's SSR (Server-Side Rendering) and SSG (Static Site Generation) features, we can develop performant applications. Additionally, with TypeScript integration, we can write more reliable code by ensuring type safety."
    },
    excerpt: {
      tr: "React ve Next.js kullanarak modern web uygulamaları geliştirmenin inceliklerini keşfedin. SSR, SSG ve TypeScript entegrasyonu hakkında detaylı bilgi.",
      en: "Discover the intricacies of developing modern web applications using React and Next.js. Detailed information about SSR, SSG, and TypeScript integration."
    },
    slug: "react-nextjs-web-gelistirme",
    author_id: "user@example.com", 
    published: true,
    tags: ["react", "nextjs", "javascript", "web"],
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    locale: "tr",
    availableLocales: ["tr", "en"],
    profiles: {
      id: "user@example.com",
      full_name: "Cemre Güner", 
      avatar_url: null
    }
  },
  {
    id: "dev-post-3",
    title: {
      tr: "TypeScript ile JavaScript Geliştirmeyi Güçlendirin",
      en: "Supercharge JavaScript Development with TypeScript"
    },
    content: {
      tr: "TypeScript, Microsoft tarafından geliştirilen ve JavaScript'e statik tip kontrolü ekleyen güçlü bir programlama dilidir. Bu yazıda TypeScript'in avantajlarını, JavaScript projelerinize nasıl entegre edeceğinizi ve en iyi pratikleri öğreneceksiniz. TypeScript ile daha az hata, daha iyi kod tamamlama ve refactoring deneyimi yaşayabilirsiniz. Özellikle büyük projelerde tip güvenliği sağlayarak geliştirme sürecini hızlandırır ve kod kalitesini artırır. Interface'ler, generic'ler ve advanced type'lar konularına da değineceğim.",
      en: "TypeScript is a powerful programming language developed by Microsoft that adds static type checking to JavaScript. In this article, you'll learn about TypeScript's advantages, how to integrate it into your JavaScript projects, and best practices. With TypeScript, you can experience fewer bugs, better code completion, and improved refactoring. Especially in large projects, it speeds up the development process and improves code quality by providing type safety. I'll also touch on interfaces, generics, and advanced types."
    },
    excerpt: {
      tr: "TypeScript'in avantajlarını ve JavaScript projelerinize nasıl dahil edeceğinizi öğrenin. Tip güvenliği, interface'ler ve best practice'ler.",
      en: "Learn about the benefits of TypeScript and how to incorporate it into your JavaScript projects. Type safety, interfaces, and best practices."
    },
    slug: "typescript-giris",
    author_id: "user@example.com",
    published: true, 
    tags: ["typescript", "javascript", "programming"],
    created_at: new Date(Date.now() - 172800000).toISOString(), // 2 gün önce
    updated_at: new Date(Date.now() - 172800000).toISOString(),
    locale: "tr",
    availableLocales: ["tr", "en"],
    profiles: {
      id: "user@example.com",
      full_name: "Cemre Güner",
      avatar_url: null
    }
  }
];

// Bu fonksiyon localStorage'a örnek yazıları ekler
export function restoreSamplePosts() {
  if (typeof window !== 'undefined') {
    // Eski verileri temizle ve yeni çok dilli verileri ekle
    localStorage.setItem('dev-posts', JSON.stringify(samplePosts));
    console.log('✅ Updated blog posts with Turkish/English content restored to localStorage');
  }
}