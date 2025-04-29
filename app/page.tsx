import Category from "@/components/catogory";
import getBlogPosts from "@/lib/posts";

import Link from "next/link";

export default function Home() {
  const posts = getBlogPosts();

  return (
    <div>
      <div>
        <h1 className="text-5xl font-bold text-center mb-6 mt-10">
          Rahul&apos;s Website
        </h1>
        <hr />
        <Category />
        <hr />
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
