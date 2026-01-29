"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getLocationList,
  type NamedApiResource,
} from "@/app/utils/pokemonapi";
import SearchBar from "@/app/components/SearchBar";

export default function LocationsPage() {
  const [locations, setLocations] = useState<NamedApiResource[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const result = await getLocationList(2000);
        if (!result.ok) {
          throw new Error("Failed to fetch locations");
        }
        setLocations(result.data.results);
      } catch (err) {
        console.error("Failed to fetch locations", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  const filteredLocations = locations.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p>Loading locations...</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-yellow-500 mb-1">All Locations</h1>
        <p className="text-gray-600">
          Showing {filteredLocations.length} of {locations.length}
        </p>
      </div>

      <div className="mb-6 flex justify-end">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search Locations"
          className="rounded"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredLocations.map((l) => (
          <Link
            key={l.name}
            href={`/locations/${l.name}`}
            className="border rounded-lg p-4 hover:bg-gray-50 transition"
          >
            {l.name.replaceAll("-", " ")}
          </Link>
        ))}
      </div>
    </div>
  );
}
