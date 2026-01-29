export const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export type NamedApiResource = {
	name: string;
	url: string;
};

export type NamedApiResourceList = {
	count: number;
	next: string | null;
	previous: string | null;
	results: NamedApiResource[];
};

export type PokeApiResponse<T> =
	| { ok: true; status: number; data: T }
	| { ok: false; status: number };

function resolveUrl(pathOrUrl: string) {
	if (/^https?:\/\//i.test(pathOrUrl)) {
		return pathOrUrl;
	}

	const trimmed = pathOrUrl.replace(/^\/+/, "");
	return `${POKEAPI_BASE_URL}/${trimmed}`;
}

function buildQuery(
	params: Record<string, string | number | boolean | undefined>
) {
	const search = new URLSearchParams();

	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined) {
			return;
		}
		search.set(key, String(value));
	});

	const query = search.toString();
	return query ? `?${query}` : "";
}

export async function fetchFromPokeApi<T>(
	pathOrUrl: string,
	init?: RequestInit
): Promise<PokeApiResponse<T>> {
	const url = resolveUrl(pathOrUrl);
	const res = await fetch(url, init);

	if (!res.ok) {
		return { ok: false, status: res.status };
	}

	const data = (await res.json()) as T;
	return { ok: true, status: res.status, data };
}

export function getPokemonList(
	limit = 2000,
	init?: RequestInit
) {
	return fetchFromPokeApi<NamedApiResourceList>(
		`pokemon${buildQuery({ limit })}`,
		init
	);
}

export function getMoveList(limit = 2000, init?: RequestInit) {
	return fetchFromPokeApi<NamedApiResourceList>(
		`move${buildQuery({ limit })}`,
		init
	);
}

export function getLocationList(
	limit = 2000,
	init?: RequestInit
) {
	return fetchFromPokeApi<NamedApiResourceList>(
		`location${buildQuery({ limit })}`,
		init
	);
}

export function getGenerationList(init?: RequestInit) {
	return fetchFromPokeApi<NamedApiResourceList>(
		"generation",
		init
	);
}

export function getPokemon(name: string, init?: RequestInit) {
	return fetchFromPokeApi<any>(`pokemon/${name}`, init);
}

export function getPokemonEncounters(
	name: string,
	init?: RequestInit
) {
	return fetchFromPokeApi<any[]>(
		`pokemon/${name}/encounters`,
		init
	);
}

export function getMove(name: string, init?: RequestInit) {
	return fetchFromPokeApi<any>(`move/${name}`, init);
}

export function getLocation(name: string, init?: RequestInit) {
	return fetchFromPokeApi<any>(`location/${name}`, init);
}

export function getGeneration(name: string, init?: RequestInit) {
	return fetchFromPokeApi<any>(`generation/${name}`, init);
}

export function getByUrl<T>(url: string, init?: RequestInit) {
	return fetchFromPokeApi<T>(url, init);
}
