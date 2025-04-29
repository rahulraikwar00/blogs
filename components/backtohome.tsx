import Link from "next/link";

export default function BackToHome() {
  return (
    <Link href="/" className="transition-colors duration-200">
      Back to home
    </Link>
  );
}
