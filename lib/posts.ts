import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  content: string;
  tag: string[];
}

export default function getBlogPosts(): BlogPost[] {
  const blogsDir = path.join(process.cwd(), "blogs");
  const files = fs.readdirSync(blogsDir);
  const blogPosts: BlogPost[] = [];

  files.forEach((file) => {
    if (file.endsWith(".md")) {
      const filePath = path.join(blogsDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      blogPosts.push({
        title: data.title || "Untitled",
        date: data.date || "Unknown",
        slug: file.replace(".md", ""),
        content,
        tag: Array.isArray(data.tags) ? data.tags : [],
      });
    }
  });

  return blogPosts;
}
