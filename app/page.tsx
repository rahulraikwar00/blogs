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
        <ul className="flex justify-center space-x-4 m-4">
          {tagList.map((tag) => {
            return (
              <li key={tag.name}>
                <Link
                  href={`/tags/${tag.name.toLowerCase()}`}
                  className="text-sm font-semibold"
                  style={{ color: tag.color }}
                >
                  {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
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

const tagList = [
  { name: "tech", color: "#A7C7E7" },
  { name: "blog", color: "#F7B7A3" },
  { name: "life", color: "#C9E4CA" },
  { name: "travel", color: "#FFD8A9" },
  { name: "music", color: "#D6CDEA" },
  { name: "philosophy", color: "#EDE0D4" },
  { name: "books", color: "#E4D4DC" },
];
