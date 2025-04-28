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
    return (
      <div>
        <h1>Post Not Found</h1>
        <p>The requested post could not be found.</p>
        <Link href="/">Back to home</Link>
      </div>
    );
  }

  // Render Markdown content
  const renderedContent = md.render(post.content);

  return (
    <div className="prose prose-lg">
      <h1>{post.title}</h1>
      <hr />
      <div className="flex justify-between text-md opacity-60 ">
        <div>{post.date}</div>
        <div>
          <Link href="/">See all post</Link>
        </div>
      </div>
      <div className="" dangerouslySetInnerHTML={{ __html: renderedContent }} />
      <Link href="/">Back to home</Link>
    </div>
  );
}
