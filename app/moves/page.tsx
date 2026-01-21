"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Move = {
  name: string;
  url: string;
};

export default function MovesPage() {
  const [moves, setMoves] = useState<Move[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMoves() {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/move?limit=2000"
        );
        const data = await res.json();
        setMoves(data.results);
      } catch (err) {
        console.error("Failed to fetch moves", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMoves();
  }, []);

  const filteredMoves = moves.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Loading moves...</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-500 mb-1">All Moves</h1>
        <p className="text-gray-600">
          Showing {filteredMoves.length} of {moves.length}
        </p>
      </div>

      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Search Moves"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredMoves.map((m) => (
          <Link
            key={m.name}
            href={`/moves/${m.name}`}
            className="border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            {m.name.replaceAll("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  );
}
