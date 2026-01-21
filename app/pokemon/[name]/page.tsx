import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";

type PageProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function PokemonDetailPage({ params }: PageProps) {
  const { name } = await params;
  const pokemonName = decodeURIComponent(name).toLowerCase();

  // Fetch Pokémon details
  const pokemonRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
    { cache: "no-store" }
  );

  if (!pokemonRes.ok) {
    notFound();
  }

  const pokemon = await pokemonRes.json();

  // Fetch encounter locations
  const encountersRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}/encounters`,
    { cache: "no-store" }
  );

  const encounters: any[] = encountersRes.ok
    ? await encountersRes.json()
    : [];

  const locations: string[] = Array.from(
    new Set(
      encounters.map(
        (e) => e.location_area.name.split("-area")[0]
      )
    )
  );

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-4xl font-bold text-yellow-500 capitalize">
          {pokemon.name}
        </h1>
      </div>

      {/* Sprites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SpriteCard
          title="Default Sprite"
          src={pokemon.sprites.front_default}
        />
        <SpriteCard
          title="Shiny Sprite"
          src={pokemon.sprites.front_shiny}
        />
      </div>

      {/* Stats */}
      <div className="border rounded-xl p-6 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-yellow-500">
          Stats
        </h2>

        {pokemon.stats.map((s: any) => (
          <StatBar
            key={s.stat.name}
            name={s.stat.name}
            value={s.base_stat}
          />
        ))}
      </div>

      {/* Locations */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-yellow-500">
          Encounter Locations
        </h2>

        <div className="flex flex-wrap gap-2">
          {locations.length === 0 ? (
            <p>No known locations.</p>
          ) : (
            locations.map((loc) => (
              <Link
                key={loc}
                href={`/locations/${loc}`}
                className="px-4 py-1 border rounded-full hover:bg-gray-50"
              >
                {loc.replaceAll("-", " ")}
              </Link>
            ))
          )}
        </div>
      </div>

      {/* Moves */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-yellow-500">
          Moves
        </h2>

        <div className="flex flex-wrap gap-2">
          {pokemon.moves.map((m: any) => (
            <Link
              key={m.move.name}
              href={`/moves/${m.move.name}`}
              className="px-4 py-1 border rounded-full hover:bg-gray-50"
            >
              {m.move.name.replaceAll("-", " ")}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function SpriteCard({ title, src }: { title: string; src: string }) {
  return (
    <div className="border rounded-xl p-6 shadow-sm text-center">
      <p className="font-semibold mb-2">{title}</p>
      <img src={src} alt={title} className="mx-auto" />
    </div>
  );
}

function StatBar({
  name,
  value,
}: {
  name: string;
  value: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="capitalize">
          {name.replaceAll("-", " ")}
        </span>
        <span>{value} / 255</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-yellow-400 h-2 rounded-full"
          style={{ width: `${(value / 255) * 100}%` }}
        />
      </div>
    </div>
  );
}
