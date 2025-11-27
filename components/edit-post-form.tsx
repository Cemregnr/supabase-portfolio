'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { devUpdatePost } from '@/lib/dev-blog';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author: string;
  createdAt: string;
  isSample?: boolean;
}

interface EditPostFormProps {
  post: Post;
}

export function EditPostForm({ post }: EditPostFormProps) {
  const [title, setTitle] = useState(post.title || '');
  const [content, setContent] = useState(post.content || '');
  const [excerpt, setExcerpt] = useState(post.excerpt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const router = useRouter();
  const locale = useLocale();

  
  const applyFormatting = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    if (selectedText) {
      let formattedText = '';
      
      switch (format) {
        case 'bold':
          formattedText = `**${selectedText}**`;
          break;
        case 'italic':
          formattedText = `*${selectedText}*`;
          break;
        case 'underline':
          formattedText = `<u>${selectedText}</u>`;
          break;
        case 'heading':
          formattedText = `## ${selectedText}`;
          break;
        case 'paragraph':
          formattedText = `\n\n${selectedText}\n\n`;
          break;
        case 'quote':
          formattedText = `> ${selectedText}`;
          break;
        case 'code':
          formattedText = `\`${selectedText}\``;
          break;
        default:
          return;
      }
      
      const newContent = content.substring(0, start) + formattedText + content.substring(end);
      setContent(newContent);
      
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
      }, 10);
    }
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    let insertText = '';
    
    switch (format) {
      case 'line-break':
        insertText = '\n\n';
        break;
      case 'horizontal-rule':
        insertText = '\n\n---\n\n';
        break;
      case 'bullet-list':
        insertText = '\n• ';
        break;
      case 'numbered-list':
        insertText = '\n1. ';
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + insertText + content.substring(start);
    setContent(newContent);
    
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + insertText.length, start + insertText.length);
    }, 10);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      
      await devUpdatePost(post.id, {
        title,
        content,
        excerpt: excerpt || content.substring(0, 150) + '...'
      });
      
      console.log('✅ Post updated successfully');
      
      
      router.push(`/${locale}/blog/${post.slug}`);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Title *
        </Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title..."
          required
          className="w-full"
        />
      </div>

      
      <div className="space-y-2">
        <Label htmlFor="excerpt" className="text-sm font-medium">
          Excerpt
        </Label>
        <Input
          id="excerpt"
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief description of your post..."
          className="w-full"
        />
      </div>

      
      <div className="space-y-2">
        <Label className="text-sm font-medium">Content *</Label>
        
        
        <div className="border border-gray-200 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
          
          <div className="flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormatting('bold')}
              title="Bold"
              className="h-8 px-2"
            >
              <strong>B</strong>
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormatting('italic')}
              title="Italic"
              className="h-8 px-2"
            >
              <em>I</em>
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormatting('underline')}
              title="Underline"
              className="h-8 px-2"
            >
              <u>U</u>
            </Button>
          </div>

          <div className="border-l border-gray-300 mx-1"></div>

         
          <div className="flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormatting('heading')}
              title="Heading"
              className="h-8 px-2 text-xs"
            >
              H2
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormatting('paragraph')}
              title="Paragraph"
              className="h-8 px-2 text-xs"
            >
              ¶
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormatting('quote')}
              title="Quote"
              className="h-8 px-2 text-xs"
            >
              "\\"
            </Button>
          </div>

          <div className="border-l border-gray-300 mx-1"></div>

          {/* Lists and Breaks */}
          <div className="flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => insertFormatting('bullet-list')}
              title="Bullet List"
              className="h-8 px-2 text-xs"
            >
              •
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => insertFormatting('numbered-list')}
              title="Numbered List"
              className="h-8 px-2 text-xs"
            >
              1.
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => insertFormatting('line-break')}
              title="Line Break"
              className="h-8 px-2 text-xs"
            >
              ↵
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => insertFormatting('horizontal-rule')}
              title="Horizontal Rule"
              className="h-8 px-2 text-xs"
            >
              ---
            </Button>
          </div>

          <div className="border-l border-gray-300 mx-1"></div>

          {/* Code */}
          <div className="flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => applyFormatting('code')}
              title="Inline Code"
              className="h-8 px-2 text-xs"
            >
              &lt;/&gt;
            </Button>
          </div>
        </div>

        
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here...&#10;&#10;Use the toolbar above to format your text:&#10;- Select text and click Bold/Italic/Underline&#10;- Click headings to add structure&#10;- Use paragraph breaks for better readability&#10;- Add quotes, lists, and code snippets"
          required
          className="w-full min-h-[400px] p-4 border border-gray-200 rounded-b-lg resize-vertical focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm leading-relaxed"
          onSelect={(e) => {
            const target = e.target as HTMLTextAreaElement;
            const selected = content.substring(target.selectionStart, target.selectionEnd);
            setSelectedText(selected);
          }}
        />

        
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded border">
          <p><strong>Formatting Guide:</strong></p>
          <ul className="mt-1 space-y-1">
            <li>• **bold text** or *italic text*</li>
            <li>• ## Headings for sections</li>
            <li>• Separate paragraphs with double line breaks</li>
            <li>• &gt; Quote blocks for important text</li>
            <li>• `inline code` for code snippets</li>
          </ul>
        </div>
      </div>

      
      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          disabled={isLoading || !title.trim() || !content.trim()}
          className="min-w-[120px]"
        >
          {isLoading ? 'Updating...' : 'Update Post'}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="min-w-[100px]"
        >
          Cancel
        </Button>
      </div>

      
      <div className="text-xs text-gray-500 pt-4 border-t">
        <p>Post ID: {post.id}</p>
        <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
        <p>Author: {post.author}</p>
      </div>
    </form>
  );
}