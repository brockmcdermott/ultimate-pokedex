"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Generation = {
  name: string;
  url: string;
};

export default function GenerationsPage() {
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenerations() {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/generation"
        );
        const data = await res.json();
        setGenerations(data.results);
      } catch (err) {
        console.error("Failed to fetch generations", err);
      } finally {
        setLoading(false);
      }
    }

    fetchGenerations();
  }, []);

  const filteredGenerations = generations.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Loading generations...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-yellow-500 mb-1">
          All Generations
        </h1>
        <p className="text-gray-600">
          Showing {filteredGenerations.length} of{" "}
          {generations.length}
        </p>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search All Generations"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full max-w-sm"
        />
      </div>

      {/* Generation List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredGenerations.map((gen) => (
          <Link
            key={gen.name}
            href={`/generations/${gen.name}`}
            className="border rounded-xl p-4 text-lg hover:bg-gray-50 transition"
          >
            {formatGenerationName(gen.name)}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function formatGenerationName(name: string) {
  // "generation-i" → "Generation I"
  const roman = name.split("-")[1]?.toUpperCase();
  return `Generation ${roman}`;
}
