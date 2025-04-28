import getBlogPosts from "@/lib/posts";

import Link from "next/link";

export default function Home() {
  const posts = getBlogPosts();

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-center">Rahul&apos;s Website</h1>
        <hr />
        <ul className="flex justify-center space-x-4">
          {tagList.map((tag) => {
            return (
              <li key={tag}>
                <Link href={`/tags/${tag}`} className="text-blue-500">
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
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

export const generateStaticParams = async () => {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

const tagList = [
  "tech",
  "blog",
  "life",
  "travel",
  "music",
  "philosophy",
  "books",
];
