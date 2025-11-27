"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Ordre de navigation limité aux pages principales (sans /about)
const orderedRoutes = ["/", "/projects", "/experiences", "/hackathons"]; 

export default function PageArrows() {
  const pathname = usePathname();
  const index = orderedRoutes.indexOf(pathname || "");

  if (index === -1) return null;

  const prev = orderedRoutes[(index - 1 + orderedRoutes.length) % orderedRoutes.length];
  const next = orderedRoutes[(index + 1) % orderedRoutes.length];

  const baseClasses =
    "fixed top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700/70 flex items-center justify-center text-white transition-transform transition-colors hover:bg-gray-500 cursor-pointer";

  return (
    <>
      <Link
        href={prev}
        className={`${baseClasses} left-4 hover:-translate-x-1`}
      >
        <FaChevronLeft size={18} />
      </Link>
      <Link
        href={next}
        className={`${baseClasses} right-4 hover:translate-x-1`}
      >
        <FaChevronRight size={18} />
      </Link>
    </>
  );
}
