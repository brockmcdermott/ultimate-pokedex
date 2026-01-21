"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Pokemon = {
  name: string;
  url: string;
};

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000"
        );
        const data = await res.json();
        setPokemon(data.results);
      } catch (err) {
        console.error("Failed to fetch Pokémon", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Loading Pokémon...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-500 mb-1">All Pokémon</h1>
        <p className="text-gray-600">
          Showing {filteredPokemon.length} of {pokemon.length}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          placeholder="Search All Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-4 py-2 w-full max-w-sm"
        />
      </div>

      {/* Pokémon List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((p) => (
          <Link
            key={p.name}
            href={`/pokemon/${p.name}`}
            className="border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
          </Link>
        ))}
      </div>
    </div>
  );
}
