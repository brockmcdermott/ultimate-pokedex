"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavTabs() {
  const pathname = usePathname();

  const tabClass = (path: string) =>
    `pb-2 border-b-2 transition ${
      pathname === path || pathname.startsWith(path + "/")
        ? "border-yellow-400 text-yellow-500 font-semibold"
        : "border-transparent text-gray-600 hover:text-gray-900"
    }`;

  return (
    <nav className="border-b mb-6">
      <ul className="flex gap-8">
        <Link href="/pokemon" className={tabClass("/pokemon")}>
          Pokémon
        </Link>

        <Link href="/locations" className={tabClass("/locations")}>
          Locations
        </Link>

        <Link href="/moves" className={tabClass("/moves")}>
          Moves
        </Link>

        <Link href="/generations" className={tabClass("/generations")}>
          Generations
        </Link>
      </ul>
    </nav>
  );
}
