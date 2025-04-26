import getBlogPosts from "@/lib/posts";
import Link from "next/link";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true, // Enable HTML tags in source
  linkify: true, // Autoconvert URLs into links
  typographer: true, // Enable smart quotes and other typographic replacements
});

async function getPost(slug: string) {
  const posts = getBlogPosts();
  const post = posts.find((post) => post.slug === slug);
  if (!post) {
    throw new Error("Post not found");
  }
  return post;
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  const renderedContent = md.render(post.content);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: renderedContent }} />
      <Link href="/">Back to home</Link>
    </div>
  );
}
