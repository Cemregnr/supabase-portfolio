// Translation service for dynamic blog post translation
export class TranslationService {
  private static instance: TranslationService;
  
  private constructor() {}
  
  static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  
  async translateText(text: string, from: string, to: string): Promise<string> {
    if (from === to) return text;
    
    try {
     
      const htmlContent = this.parseHTML(text);
      const translatedContent = await this.mockTranslate(htmlContent, from, to);
      
      return translatedContent;
    } catch (error) {
      console.error('Translation error:', error);
      return text; 
    }
  }

 
  private parseHTML(html: string): string {
    
    return html;
  }

 
  private async mockTranslate(text: string, from: string, to: string): Promise<string> {
    
    const translations: { [key: string]: { [key: string]: string } } = {
      'tr-en': {
        'Merhaba': 'Hello',
        'Dünya': 'World',
        'Blog': 'Blog',
        'Yazı': 'Post',
        'Başlık': 'Title',
        'İçerik': 'Content',
        'Yazar': 'Author',
        'Tarih': 'Date',
        'Etiket': 'Tag',
        'Okumaya devam et': 'Read more',
        'Yeni yazı': 'New post',
        'Düzenle': 'Edit',
        'Sil': 'Delete',
        'Kaydet': 'Save',
        'İptal': 'Cancel',
        'Yayınla': 'Publish',
        'Taslak': 'Draft'
      },
      'en-tr': {
        'Hello': 'Merhaba',
        'World': 'Dünya',
        'Blog': 'Blog',
        'Post': 'Yazı',
        'Title': 'Başlık',
        'Content': 'İçerik',
        'Author': 'Yazar',
        'Date': 'Tarih',
        'Tag': 'Etiket',
        'Read more': 'Okumaya devam et',
        'New post': 'Yeni yazı',
        'Edit': 'Düzenle',
        'Delete': 'Sil',
        'Save': 'Kaydet',
        'Cancel': 'İptal',
        'Publish': 'Yayınla',
        'Draft': 'Taslak'
      }
    };

    const translationKey = `${from}-${to}`;
    const dict = translations[translationKey] || {};
    
    let translatedText = text;
    Object.entries(dict).forEach(([original, translated]) => {
      const regex = new RegExp(`\\b${original}\\b`, 'gi');
      translatedText = translatedText.replace(regex, translated);
    });

    return translatedText;
  }

  
  async translatePost(post: any, targetLanguage: string): Promise<any> {
    const originalLang = post.original_language || 'tr';
    
    if (originalLang === targetLanguage) {
      
      return {
        ...post,
        title: this.getLocalizedContent(post.title, targetLanguage),
        content: this.getLocalizedContent(post.content, targetLanguage),
        excerpt: this.getLocalizedContent(post.excerpt, targetLanguage),
        meta_description: this.getLocalizedContent(post.meta_description, targetLanguage)
      };
    }

   
    const translatedTitle = await this.translateText(
      this.getLocalizedContent(post.title, originalLang),
      originalLang,
      targetLanguage
    );

    const translatedContent = await this.translateText(
      this.getLocalizedContent(post.content, originalLang),
      originalLang,
      targetLanguage
    );

    const translatedExcerpt = post.excerpt ? await this.translateText(
      this.getLocalizedContent(post.excerpt, originalLang),
      originalLang,
      targetLanguage
    ) : null;

    return {
      ...post,
      title: translatedTitle,
      content: translatedContent,
      excerpt: translatedExcerpt,
      auto_translated: true,
      current_language: targetLanguage
    };
  }

  
  private getLocalizedContent(content: any, language: string): string {
    if (typeof content === 'string') {
      return content;
    }
    
    if (typeof content === 'object' && content !== null) {
      return content[language] || content['tr'] || content['en'] || '';
    }

    return '';
  }

  
  formatPostForStorage(post: any, language: string): any {
    return {
      ...post,
      title: {
        [language]: post.title,
        ...(typeof post.title === 'object' ? post.title : {})
      },
      content: {
        [language]: post.content,
        ...(typeof post.content === 'object' ? post.content : {})
      },
      excerpt: post.excerpt ? {
        [language]: post.excerpt,
        ...(typeof post.excerpt === 'object' ? post.excerpt : {})
      } : null,
      meta_description: post.meta_description ? {
        [language]: post.meta_description,
        ...(typeof post.meta_description === 'object' ? post.meta_description : {})
      } : null,
      original_language: language,
      auto_translated: false
    };
  }
}

export const translationService = TranslationService.getInstance();