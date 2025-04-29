import getBlogPosts from "@/lib/posts";
import Link from "next/link";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

interface Post {
  slug: string;
  title: string;
  content: string;
  date: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<{ title: string; description: string }> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.content.slice(0, 150), // Preview of the content
  };
}

// Fetch the post based on the slug
async function getPost(slug: string): Promise<Post | null> {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Fetch post data
  const post = await getPost(slug);

  if (!post) {
    // Handle post not found error (display 404 page or redirect)
    return [];
  }

  // Render Markdown content
  const renderedContent = md.render(post.content);

  return (
    <div className="prose prose-lg mx-auto mt-12 mb-12">
      <h1 className="mb-2">{post.title}</h1>
      <hr className="my-4" />

      <div className="flex justify-between items-center text-sm text-gray-500 mb-8">
        <time dateTime={post.date}>{post.date}</time>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          See all posts
        </Link>
      </div>

      <article dangerouslySetInnerHTML={{ __html: renderedContent }} />

      <div className="mt-10"></div>
    </div>
  );
}
