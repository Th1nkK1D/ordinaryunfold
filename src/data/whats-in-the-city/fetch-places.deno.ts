// To tun script with Deno
// deno run --allow-net --allow-write fetch-places.deno.ts --key <TOKEN> --area 10 --tag supermarket --output bangkok-supermarket.json

import { parse } from 'https://deno.land/std/flags/mod.ts';

interface Place {
	type: string;
	id: string;
	name: string;
	lat: number;
	lon: number;
	icon: string;
	tag: string[];
	url: string;
	address: string;
	tel: string;
	contributor: string;
	verified: boolean;
	obsoleted: boolean;
}

interface SearchResult {
	meta: {
		hasmore: boolean;
		start: number;
		end: number;
		keyword: string;
	};
	data: Place[];
}

const { _, output, ...query } = parse(Deno.args);

console.log(query);

// Longdo API doc: http://api.longdo.com/map/doc/rest.php
const API_ENDPOINT = 'https://search.longdo.com/mapsearch/json/search';

let offset = 0;
let hasmore = true;
const places: { id: string; name: string; lat: number; lon: number }[] = [];

while (hasmore) {
	const queryString = Object.entries({ ...query, offset })
		.map((pair) => pair.join('='))
		.join('&');

	console.log(`fetching @ offset=${offset} ...`);

	const res = await fetch(`${API_ENDPOINT}?${queryString}`);

	if (res.ok) {
		const { meta, data } = (await res.json()) as SearchResult;

		places.push(
			...data
				.filter(({ id }) => !places.some((exist) => exist.id === id))
				.map(({ id, name, lat, lon }) => ({ id, name: name.trim(), lat, lon }))
		);

		hasmore = meta.hasmore;
		offset = meta.end + 1;
	} else {
		console.error('Failed to fetch API');
		hasmore = false;
	}
}

await Deno.writeTextFile(output, JSON.stringify(places));
