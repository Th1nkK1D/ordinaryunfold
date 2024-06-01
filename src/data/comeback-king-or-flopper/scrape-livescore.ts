import { $ } from 'bun';
import pLimit from 'p-limit';
import puppeteer from 'puppeteer';

const limit = pLimit(10);

// From https://www.livescore.com/en/football/england/premier-league/
const leaguePaths = [
	'england/premier-league',
	'germany/bundesliga',
	'italy/serie-a',
	'spain/laliga'
];

const browser = await puppeteer.launch({
	executablePath: await $`which chromium`.text()
});

const leagues = await Promise.all(
	leaguePaths.map(async (path) => {
		const res = await (
			await fetch(`https://prod-public-api.livescore.com/v1/api/app/stage/soccer/${path}/7`)
		).json();

		return {
			path,
			name: res.Stages[0].Snm,
			matches: res.Stages[0].Events
		};
	})
);

console.log(
	leagues.map((league) => `${league.name} : ${league.matches.length} matches`).join('\n')
);

console.log('\nFetching match scores...');

const matches = await Promise.all(
	leagues.flatMap((league) =>
		league.matches.map((event: { [key: string]: unknown }) =>
			limit(async () => {
				const id = event.Eid;
				// @ts-ignore
				const teams: string[] = [event.T1[0].Nm, event.T2[0].Nm];

				return {
					id,
					league: league.name,
					kickoffAt: event.Esd,
					status: event.Eps,
					teams,
					...(await scrapeScores(league.path, id, teams))
				};
			})
		)
	)
);

browser.close();

Bun.write(`${import.meta.dir}/matches-2324.json`, JSON.stringify(matches, undefined, 2));

console.log(`Total ${matches.length} matches retrieved`);

async function scrapeScores(path: string, id: unknown, teams: string[]) {
	const url = `https://www.livescore.com/en/football/${path}/${teams.map((t) => t.toLowerCase().replaceAll(' ', '-')).join('-vs-')}/${id}/`;

	try {
		const page = await browser.newPage();

		console.log(`> ${teams.join(' - ')}`);

		await page.goto(url);

		const scoreTable = await page.waitForSelector('div.Am', { timeout: 10000 });

		const scores = await scoreTable?.evaluate((el) =>
			// @ts-ignore
			[...el.querySelectorAll('div.ls')]
				.map((event) => [
					event.querySelector('span.qs').innerText.replace(`'`, '').replaceAll(' ', ''),
					event.querySelector('div.ps').innerText.replaceAll(' ', '')
				])
				.filter((event) => event[1])
				.reduce((obj, [mins, score]) => ({ ...obj, [mins]: score }), {})
		);

		await page.close();

		return { scores, url };
	} catch (e) {
		console.warn(`Could not retrieve score for ${url}`, e);
		return { scores: undefined, url };
	}
}
