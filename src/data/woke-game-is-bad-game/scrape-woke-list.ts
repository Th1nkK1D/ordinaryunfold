import { $ } from 'bun';
import { csvFormat } from 'd3-dsv';
import { exists, mkdir } from 'fs/promises';
import { join } from 'path';
import puppeteer from 'puppeteer';

const OUT_DIR = 'out';
const OUT_FILE = 'woke-content-detector-list.csv';

const browser = await puppeteer.launch({
	executablePath: await $`which chromium`.text()
});

const page = await browser.newPage();
await page.goto('https://store.steampowered.com/curator/44927664-Woke-Content-Detector/');

// Block heavy content
await page.setRequestInterception(true);
page.on('request', (request) => {
	switch (request.resourceType()) {
		case 'image':
		case 'media':
			request.abort();
			break;
		default:
			request.continue();
	}
});

let previousPageHeight = 0;
let newPageHeight = 0;

process.stdout.write('loading more items');

do {
	previousPageHeight = newPageHeight;

	await page.evaluate(() => {
		window.scrollTo(0, document.body.scrollHeight);
	});

	await page.waitForNetworkIdle();

	newPageHeight = await page.evaluate(() => document.body.scrollHeight);

	process.stdout.write('.');
} while (newPageHeight > previousPageHeight);

const games = await page.evaluate(() => {
	let items: object[] = [];

	document.querySelectorAll('div.recommendation').forEach((e) => {
		items.push({
			date: e.querySelector('span.curator_review_date')?.textContent,
			label: e.querySelector('div.recommendation_type_ctn > span')?.textContent,
			description: e.querySelector('div.recommendation_desc')?.textContent?.trim(),
			gameUrl: e.querySelector('a.recommendation_link')?.getAttribute('href')?.split('?')[0],
			reviewUrl: e
				.querySelector('div.recommendation_readmore')
				?.children[1]?.getAttribute('href')
				?.split('?')[0]
		});
	});

	return items;
});

await browser.close();

const outFolderPath = join(import.meta.dir, OUT_DIR);
const outFilePath = join(outFolderPath, OUT_FILE);

if (!(await exists(outFolderPath))) {
	await mkdir(outFolderPath);
}

await Bun.write(outFilePath, csvFormat(games));

console.log(`\nTotal ${games.length} games saved to ${outFilePath}`);
