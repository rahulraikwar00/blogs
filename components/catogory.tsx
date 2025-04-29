import Link from "next/link";

export default function Category() {
  return (
    <ul className="flex justify-center space-x-4 m-4">
      {tagList.map((tag) => {
        return (
          <li key={tag.name}>
            <Link
              href={`/tags/${tag.name.toLowerCase()}`}
              className="text-sm font-semibold p-2  "
              style={{ background: tag.color, color: "var(--foreground)" }}
            >
              {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export const tagList = [
  { name: "tech", color: "#A7C7E7" },
  { name: "blog", color: "#F7B7A3" },
  { name: "life", color: "#C9E4CA" },
  { name: "travel", color: "#FFD8A9" },
  { name: "music", color: "#D6CDEA" },
  { name: "philosophy", color: "#EDE0D4" },
  { name: "books", color: "#E4D4DC" },
];
