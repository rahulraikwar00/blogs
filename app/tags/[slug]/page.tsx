import getBlogPosts from "@/lib/posts";
import { BlogPost } from "@/lib/posts";
import Link from "next/link";

export default async function TagsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center">
        {slug.charAt(0).toUpperCase() + slug.slice(1)}
      </h1>{" "}
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
        {post.length === 0 ? (
          <NoPostToDisplay />
        ) : (
          <DisplayPosts posts={post} />
        )}
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

const NoPostToDisplay = () => {
  return <p>No posts found for this tag.</p>;
};

async function getPost(slug: string) {
  const posts = getBlogPosts();

  const filteredPosts = posts.filter((post) => post.tag.includes(slug));

  if (filteredPosts.length === 0) {
    return [];
  }
  return filteredPosts;
}

const DisplayPosts = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div>
      {posts.map((post: BlogPost) => (
        <div key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          <p>{post.date}</p>
        </div>
      ))}
    </div>
  );
};
