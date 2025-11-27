// Sample posts'ları tamamen temizlemek için utility
export function clearAllSamplePosts() {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = localStorage.getItem('dev-posts');
    if (saved) {
      const posts = JSON.parse(saved);
      
      // Bu spesifik sample posts'ları sil
      const postsToDelete = [
        'Supercharge JavaScript Development with TypeScript',
        'Modern Web Development: A Guide to React and Next.js', 
        'My First Blog Post - Introducing Myself'
      ];
      
      const filteredPosts = posts.filter((post: any) => {
        const title = typeof post.title === 'string' ? post.title : 
                     (post.title?.en || post.title?.tr || '');
        const shouldDelete = postsToDelete.some(deleteTitle => title.includes(deleteTitle));
        
        if (shouldDelete) {
          console.log('🗑️ Deleting sample post:', title);
        }
        
        return !shouldDelete;
      });
      
      localStorage.setItem('dev-posts', JSON.stringify(filteredPosts));
      console.log('✅ Sample posts cleanup completed. Remaining posts:', filteredPosts.length);
      
      return filteredPosts.length;
    }
  } catch (error) {
    console.error('Error clearing sample posts:', error);
  }
  
  return 0;
}

// Convert all posts to English-only format
export function convertToEnglishOnly() {
  if (typeof window === 'undefined') return;
  
  try {
    const saved = localStorage.getItem('dev-posts');
    if (saved) {
      const posts = JSON.parse(saved);
      
      const updatedPosts = posts.map((post: any) => {
        // Convert all content to English-only format
        if (post.title && typeof post.title === 'object' && post.title.en) {
          post.title = post.title.en;
        }
        
        if (post.content && typeof post.content === 'object' && post.content.en) {
          post.content = post.content.en;
        }
        
        if (post.excerpt && typeof post.excerpt === 'object' && post.excerpt.en) {
          post.excerpt = post.excerpt.en;
        }
        
        // Set locale info
        post.availableLocales = ['en'];
        post.locale = 'en';
        
        return post;
      });
      
      localStorage.setItem('dev-posts', JSON.stringify(updatedPosts));
      console.log('✅ All posts converted to English-only format');
    }
  } catch (error) {
    console.error('Error converting to English:', error);
  }
}

// Create fresh English-only posts
export function createFreshEnglishPosts() {
  if (typeof window === 'undefined') return;
  
  // Clear all existing posts
  localStorage.removeItem('dev-posts');
  localStorage.removeItem('dev-blog-posts');
  
  console.log('🧹 Cleared all existing posts from localStorage');
  

  const devUser = {
    email: 'dev-user@example.com',
    id: 'dev-user@example.com',
    name: 'Cemre Güner'
  };
  localStorage.setItem('dev-user', JSON.stringify(devUser));
  
  
  const englishPosts = [
    {
      id: 'dev-post-1',
      title: 'How to Stay Motivated While Learning English',
      content: 'Learning English can be challenging, but staying motivated is key to success.\n\nHere are some effective strategies:\n\n• Set realistic daily goals\n• Practice speaking with native speakers\n• Watch English movies with subtitles\n• Read books at your level\n• Celebrate small victories\n\nRemember, consistency is more important than perfection. Every day of practice gets you closer to fluency.',
      excerpt: 'Learning English can be challenging, but staying motivated is key to success.',
      author: 'Cemre Güner',
      author_id: 'dev-user@example.com',
      created_at: new Date('2024-11-20').toISOString(),
      updated_at: new Date('2024-11-20').toISOString(),
      published: true,
      tags: ['english', 'learning', 'motivation'],
      slug: 'how-to-stay-motivated-while-learning-english',
      locale: 'en',
      availableLocales: ['en'],
      isSample: false,
      profiles: {
        id: 'dev-user@example.com',
        full_name: 'Cemre Güner',
        avatar_url: null
      }
    },
    {
      id: 'dev-post-2',
      title: 'Why Listening Skills Matter More Than You Think',
      content: 'Many English learners focus heavily on grammar and vocabulary, but listening skills are often overlooked.\n\nHere\'s why listening is crucial:\n\n• It improves your pronunciation naturally\n• Helps you understand different accents\n• Builds your vocabulary in context\n• Develops your sense of English rhythm\n• Makes real conversations easier\n\nStart with simple podcasts and gradually work your way up to more complex content. Your ears need time to adjust to the English sound patterns.',
      excerpt: 'Many English learners focus heavily on grammar and vocabulary, but listening skills are often overlooked.',
      author: 'Cemre Güner',
      author_id: 'dev-user@example.com',
      created_at: new Date('2024-11-21').toISOString(),
      updated_at: new Date('2024-11-21').toISOString(),
      published: true,
      tags: ['english', 'listening', 'skills'],
      slug: 'why-listening-skills-matter-more-than-you-think',
      locale: 'en',
      availableLocales: ['en'],
      isSample: false,
      profiles: {
        id: 'dev-user@example.com',
        full_name: 'Cemre Güner',
        avatar_url: null
      }
    },
    {
      id: 'dev-post-3',
      title: 'Building Confidence in English Conversation',
      content: 'Speaking English confidently takes practice and the right mindset.\n\nTips to build confidence:\n\n• Start with simple topics you know well\n• Don\'t worry about making mistakes\n• Practice in front of a mirror\n• Record yourself speaking\n• Find conversation partners online\n• Join English speaking groups\n\nRemember, even native speakers make mistakes. The goal is communication, not perfection.',
      excerpt: 'Speaking English confidently takes practice and the right mindset.',
      author: 'Cemre Güner',
      author_id: 'dev-user@example.com',
      created_at: new Date('2024-11-22').toISOString(),
      updated_at: new Date('2024-11-22').toISOString(),
      published: true,
      tags: ['english', 'speaking', 'confidence'],
      slug: 'building-confidence-in-english-conversation',
      locale: 'en',
      availableLocales: ['en'],
      isSample: false,
      profiles: {
        id: 'dev-user@example.com',
        full_name: 'Cemre Güner',
        avatar_url: null
      }
    }
  ];
  
  localStorage.setItem('dev-posts', JSON.stringify(englishPosts));
  console.log('✅ Created fresh English-only posts');
  console.log('📝 Posts created:', englishPosts.map(p => p.title));
}

