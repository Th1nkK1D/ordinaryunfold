import { $ } from 'bun';
import { csvFormat, csvParse } from 'd3-dsv';
import { join } from 'path';
import puppeteer from 'puppeteer';

const OUT_FILE = 'out/related-steam-games.csv';

const outFilePath = join(import.meta.dir, OUT_FILE);

// Patch missing data if output is exist
const sources = csvParse(
	(await Bun.file(outFilePath).exists())
		? await Bun.file(outFilePath).text()
		: await Bun.file('./out/woke-content-detector-list.csv').text()
);

const browser = await puppeteer.launch({
	executablePath: await $`which chromium`.text()
});

const games: object[] = [];

for (let i = 0; i < sources.length; i++) {
	const { gameUrl, name } = sources[i];
	if (name) {
		games.push(sources[i]);
	} else {
		const info = await scrapeGameInfo(gameUrl);

		games.push({
			...info,
			gameUrl
		});

		console.log(`Scraped ${i + 1}/${sources.length} ${'name' in info ? info.name : 'NOT FOUND'}`);
	}
}

browser.close();

await Bun.write(outFilePath, csvFormat(games));

console.log(`Total ${games.length} games saved to ${OUT_FILE}`);

async function scrapeGameInfo(url: string) {
	try {
		const page = await browser.newPage();

		// Block heavy content
		await page.setRequestInterception(true);
		page.on('request', (request) => {
			switch (request.resourceType()) {
				case 'image':
				case 'media':
				case 'script':
				case 'stylesheet':
					request.abort();
					break;
				default:
					request.continue();
			}
		});

		// Set cookie to bypass age restriction
		await page.setCookie({
			name: 'birthtime',
			value: '820429201',
			domain: 'store.steampowered.com'
		});

		await page.goto(url);

		const info = await page.evaluate(() => ({
			name: document.querySelector('#appHubAppName')?.textContent?.trim(),
			description: document.querySelector('div.game_description_snippet')?.textContent?.trim(),
			releaseDate: document.querySelector('div.release_date > .date')?.textContent?.trim(),
			developer: document.querySelector('#developers_list')?.textContent?.trim(),
			//@ts-expect-error can spread in browser context
			tags: [...document.querySelectorAll('a.app_tag')].map((e) => e.textContent.trim()),
			//@ts-expect-error can spread in browser context
			reviews: [...document.querySelectorAll('#userReviews > div.user_reviews_summary_row')].map(
				(e) => e.getAttribute('data-tooltip-html')
			),
			metacriticScore: document
				.querySelector('#apppage_metacritic_block div.score')
				?.textContent?.trim(),
			metacriticUrl: document
				.querySelector('#apppage_metacritic_block a')
				?.getAttribute('href')
				?.split('?')[0],
			imageUrl: document
				.querySelector('img.game_header_image_full')
				?.getAttribute('src')
				?.split('?')[0]
		}));

		await page.close();

		return info;
	} catch (e) {
		console.warn(`Could not retrieve info in ${url}`, e);
		return {};
	}
}
