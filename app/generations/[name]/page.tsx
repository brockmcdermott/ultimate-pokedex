"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Generation = {
  main_region: {
    name: string;
  };
  pokemon_species: {
    name: string;
  }[];
};

export default function GenerationDetailPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const router = useRouter();

  const [generation, setGeneration] = useState<Generation | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGeneration() {
      const { name } = await params;
      const genName = decodeURIComponent(name).toLowerCase();

      const res = await fetch(
        `https://pokeapi.co/api/v2/generation/${genName}`
      );

      if (!res.ok) {
        setLoading(false);
        return;
      }

      const data = await res.json();
      setGeneration(data);
      setLoading(false);
    }

    fetchGeneration();
  }, [params]);

  if (loading) {
    return <p>Loading generation...</p>;
  }

  if (!generation) {
    return <p>Generation not found.</p>;
  }

  const filteredSpecies = generation.pokemon_species
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-yellow-500 font-semibold"
      >
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold text-yellow-500 knowing">
        {formatGenerationName()}
      </h1>

      {/* Main Region */}
      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-1">
          Main Region
        </h2>
        <p className="capitalize">
          {generation.main_region.name}
        </p>
      </div>

      {/* Pokémon Species */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-yellow-500">
              Pokémon Species
            </h2>
            <p className="text-gray-600">
              Showing {filteredSpecies.length} of{" "}
              {generation.pokemon_species.length}
            </p>
          </div>

          <input
            type="text"
            placeholder="Search Pokémon Species"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full max-w-sm"
          />
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSpecies.map((p) => (
            <Link
              key={p.name}
              href={`/pokemon/${p.name}`}
              className="border rounded-xl p-4 hover:bg-gray-50 transition capitalize"
            >
              {p.name.replace("-", " ")}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  function formatGenerationName() {
    const roman = generationNameToRoman();
    return `Generation ${roman}`;
  }

  function generationNameToRoman() {
    // params.name will be like "generation-i"
    const parts = location.pathname.split("/");
    return parts[parts.length - 1]
      ?.split("-")[1]
      ?.toUpperCase();
  }
}
