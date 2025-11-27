export default function DebugPage() {
  if (typeof window === 'undefined') {
    return <div>Server-side - no access to localStorage</div>;
  }

  const posts = JSON.parse(localStorage.getItem('dev-posts') || '[]');
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Debug localStorage</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Posts in localStorage:</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(posts, null, 2)}
          </pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Post count: {posts.length}</h2>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Post slugs:</h2>
          <ul className="list-disc list-inside">
            {posts.map((post: any, index: number) => (
              <li key={index}>
                {post.slug} (isSample: {String(post.isSample)})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}