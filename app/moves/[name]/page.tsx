import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/app/components/BackButton";
import { getMove } from "@/app/utils/pokemonapi";

type PageProps = {
  params: Promise<{
    name: string;
  }>;
};

export default async function MoveDetailPage({ params }: PageProps) {
  const { name } = await params;
  const moveName = decodeURIComponent(name).toLowerCase();

  const res = await getMove(moveName, { cache: "no-store" });

  if (!res.ok) {
    notFound();
  }

  const move = res.data;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-4xl font-bold text-yellow-500 capitalize">
          {move.name.replaceAll("-", " ")}
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Accuracy" value={move.accuracy ?? "—"} />
        <StatCard label="PP" value={move.pp ?? "—"} />
        <StatCard label="Power" value={move.power ?? "—"} />
      </div>

      {/* Flavor Text */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-yellow-500">
          Flavor Text
        </h2>

        {move.flavor_text_entries.map((f: any, i: number) => (
          <div
            key={`${f.version_group.name}-${i}`}
            className="border rounded-xl p-4 shadow-sm"
          >
            <p className="italic mb-1">
              {f.flavor_text.replace(/\n|\f/g, " ")}
            </p>
            <p className="text-sm text-gray-600 capitalize">
              {f.version_group.name.replaceAll("-", " ")}
            </p>
          </div>
        ))}
      </div>

      {/* Learned By Pokémon */}
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-yellow-500">
          Learned By Pokémon
        </h2>

        <p className="text-gray-600">
          Showing {move.learned_by_pokemon.length} of{" "}
          {move.learned_by_pokemon.length}
        </p>

        <div className="flex flex-wrap gap-2">
          {move.learned_by_pokemon.map((p: any) => (
            <Link
              key={p.name}
              href={`/pokemon/${p.name}`}
              className="px-4 py-1 border rounded-full hover:bg-gray-50"
            >
              {p.name.replaceAll("-", " ")}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <div className="border rounded-xl p-4 shadow-sm text-center">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
