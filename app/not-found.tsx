import Link from "next/link";
import { Dot } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-2 ">
      <div>
        <Dot className=" animate-ping h-10 w-10 text-red-400" />
      </div>

      <div>
        <div className="global ">
          <h2>Not Found</h2>
          <p>Could not find requested resource</p>
          <Link href="/" className="flex items-center gap-2">
            ← Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
