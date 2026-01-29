"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getPokemonList,
  type NamedApiResource,
} from "@/app/utils/pokemonapi";
import SearchBar from "@/app/components/SearchBar";

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<NamedApiResource[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const result = await getPokemonList(2000);
        if (!result.ok) {
          throw new Error("Failed to fetch Pokémon");
        }
        setPokemon(result.data.results);
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
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search All Pokémon"
          className="rounded"
        />
      </div>

      {/* Pokémon List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemon.map((p) => {
          const spriteUrl = getSpriteUrlFromResource(p.url);

          return (
            <Link
              key={p.name}
              href={`/pokemon/${p.name}`}
              className="border rounded-xl p-4 hover:bg-gray-50 transition flex items-center gap-4"
            >
              {spriteUrl ? (
                <img
                  src={spriteUrl}
                  alt={`${p.name} sprite`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain bg-yellow-50 rounded-full p-2"
                />
              ) : null}
              <span className="font-semibold">
                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function getSpriteUrlFromResource(url: string) {
  const id = url.split("/").filter(Boolean).pop();
  if (!id) {
    return "";
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}
