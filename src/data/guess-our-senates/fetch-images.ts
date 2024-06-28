import { CANDIDATES_URL, IMAGES_DIR, type OfficialCandidate } from './config';

const candidates: OfficialCandidate[] = await (await fetch(CANDIDATES_URL)).json();

console.log(`Found ${candidates.length} candidates`);

for (const { pdf_url } of candidates) {
	const filename = `${IMAGES_DIR}/${pdf_url.split('/').at(-1)}`;

	if (!(await Bun.file(filename).exists())) {
		console.log(`Fetching ${pdf_url} ...`);

		const res = await fetch(pdf_url);

		Bun.write(filename, await res.blob());
	}
}
