import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";

type PageProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function LocationDetailPage({ params }: PageProps) {
  const { name } = await params;
  const locationName = decodeURIComponent(name).toLowerCase();

  // Fetch location
  const res = await fetch(
    `https://pokeapi.co/api/v2/location/${locationName}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const location = await res.json();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-4xl font-bold text-yellow-500 capitalize">
          {location.name.replaceAll("-", " ")}
        </h1>
      </div>

      {/* Region Card */}
      <div className="border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Region</h2>
        <p className="capitalize">
          {location.region
            ? location.region.name.replaceAll("-", " ")
            : "Unknown"}
        </p>
      </div>

      {/* Location Areas */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-yellow-500">
          Location Areas
        </h2>

        {location.areas.map((area: any) => (
          <AreaCard key={area.name} area={area} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Area Card ---------------- */

async function AreaCard({ area }: { area: any }) {
  const res = await fetch(area.url, { cache: "no-store" });
  const data = await res.json();

  const pokemon = data.pokemon_encounters.map(
    (p: any) => p.pokemon.name
  );

  return (
    <div className="border rounded-xl p-6 shadow-sm space-y-3">
      <h3 className="text-xl font-semibold text-yellow-500 capitalize">
        {area.name.replaceAll("-", " ")}
      </h3>

      <p className="text-gray-600">
        {pokemon.length} Pokémon found
      </p>

      <div className="flex flex-wrap gap-2">
        {pokemon.map((name: string) => (
          <Link
            key={name}
            href={`/pokemon/${name}`}
            className="px-3 py-1 border rounded-full hover:bg-gray-50"
          >
            {name.replaceAll("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  );
}
