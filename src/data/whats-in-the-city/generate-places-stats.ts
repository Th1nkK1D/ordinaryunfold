const INPUT_PATH = '../../../static/whats-in-the-city/json/';
const OUTPUT_FILE = 'places-stats.json';

const placeFiles = [...Deno.readDirSync(INPUT_PATH)]
	.filter(({ name }) => !name.includes('-geo'))
	.map(({ name }) => {
		const [city, ...category] = name.replace('.json', '').split('-');
		return {
			city,
			category: category.join('-'),
			path: `${INPUT_PATH}${name}`
		};
	});

placeFiles.sort((a, z) => a.category.localeCompare(z.category));

const contentCounts = (
	await Promise.all(placeFiles.map(({ path }) => Deno.readTextFile(path)))
).map((text) => JSON.parse(text).length);

const stats = placeFiles.reduce<{
	[city: string]: {
		[category: string]: number;
	};
}>((obj, { city, category }, index) => {
	if (!obj[city]) obj[city] = {};

	obj[city][category] = contentCounts[index];

	return obj;
}, {});

Deno.writeTextFile(OUTPUT_FILE, JSON.stringify(stats));
