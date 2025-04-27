import getBlogPosts from "@/lib/posts";
import Link from "next/link";

async function getPost(slug: string) {
  const posts = getBlogPosts();
  console.log(slug, posts);
  const post = posts.filter((post) => post.tag && post.tag.includes(slug));
  console.log(post);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
}

export default async function TagsPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">{params.slug}</h1>
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
        {post.map((post) => (
          <div key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            <p>{post.date}</p>
          </div>
        ))}
      </div>
      <Link href="/">Back to home</Link>
    </div>
  );
}

const tagList = [
  "tech",
  "blog",
  "life",
  "travel",
  "music",
  "philosophy",
  "books",
];
