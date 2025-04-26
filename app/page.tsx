import getBlogPosts from "@/lib/posts";

import Link from "next/link";

export default function Home() {
  const posts = getBlogPosts();
  console.log(posts.length);
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center">Rahul's Website</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.slug}>
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              <p>{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
