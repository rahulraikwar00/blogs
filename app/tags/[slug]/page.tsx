import Category from "@/components/catogory";
import getBlogPosts from "@/lib/posts";
import { BlogPost } from "@/lib/posts";
import Link from "next/link";
import { tagList } from "@/components/catogory";
import BackToHome from "@/components/backtohome";

export default async function TagsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPost(slug);

  return (
    <div className="min-h-screen">
      <h1 className="text-5xl font-bold text-center mb-6 mt-10">
        {slug.charAt(0).toUpperCase() + slug.slice(1)}
      </h1>
      <hr />
      <Category />
      <hr />
      <div className="space-y-6">
        {post.length === 0 ? (
          <NoPostToDisplay />
        ) : (
          <DisplayPosts posts={post} />
        )}
      </div>
      <BackToHome />
    </div>
  );
}

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
