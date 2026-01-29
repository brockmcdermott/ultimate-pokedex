"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getGenerationList,
  type NamedApiResource,
} from "@/app/utils/pokemonapi";
import SearchBar from "@/app/components/SearchBar";

export default function GenerationsPage() {
  const [generations, setGenerations] = useState<NamedApiResource[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenerations() {
      try {
        const result = await getGenerationList();
        if (!result.ok) {
          throw new Error("Failed to fetch generations");
        }
        setGenerations(result.data.results);
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
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search All Generations"
          className="rounded-lg"
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
