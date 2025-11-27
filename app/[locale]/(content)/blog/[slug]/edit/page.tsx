import { Suspense } from 'react';
import { devFetchPostBySlug } from '../../../../../../lib/dev-blog';
import { notFound } from 'next/navigation';
import { EditPostForm } from '../../../../../../components/edit-post-form';

export default async function EditPost({ 
  params 
}: { 
  params: Promise<{ slug: string; locale: string }> 
}) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;

  let post;
  try {
    post = await devFetchPostBySlug(slug, locale);
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPostForm post={post} />
      </Suspense>
    </div>
  );
}