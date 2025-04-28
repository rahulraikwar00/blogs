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

  const metadata = await generateMetadata({ params });

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        {slug.charAt(0).toUpperCase() + slug.slice(1)}
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
  { name: "tech", color: "#A7C7E7" },
  { name: "blog", color: "#F7B7A3" },
  { name: "life", color: "#C9E4CA" },
  { name: "travel", color: "#FFD8A9" },
  { name: "music", color: "#D6CDEA" },
  { name: "philosophy", color: "#EDE0D4" },
  { name: "books", color: "#E4D4DC" },
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
    <div className="space-y-6">
      {posts.map((post: BlogPost) => (
        <div key={post.slug}>
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          <p>{post.date}</p>
        </div>
      ))}
    </div>
  );
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<{ title: string; description: string; color: string }> {
  const { slug } = await params;

  const tag = tagList.find((tag) => tag.name === slug);

  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Posts`,
    description: `Posts tagged with ${slug}`,
    color: tag ? tag.color : "#FFFFFF", // Default to white if no matching tag
  };
}
