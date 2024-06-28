import { CANDIDATES_URL, TEXTS_DIR, type OfficialCandidate } from './config';
import { csvFormat } from 'd3-dsv';
import { readdirSync } from 'fs';

const texts = readdirSync('texts').filter((file) => file.endsWith('.txt'));

console.log(`Found ${texts.length} transcripts`);

let data: [string, string][] = [];

for (const file of texts) {
	data.push([file, await Bun.file(`${TEXTS_DIR}/${file}`).text()]);
}

const transcripts = data.map(([file, text]) => {
	const lines = text
		.split('\n')
		.map((line) => line.trim().replace(/\s+/g, ' '))
		.filter((line) => line.length > 0);
	const educationLine = lines.findIndex((line) => line.includes('ประวัติการศึกษา'));
	const experienceLine = lines.findIndex((line) =>
		['ประวัติการทํางาน', '๕ บรรทัด'].some((word) => line.includes(word))
	);
	const endingLine =
		experienceLine +
		1 +
		lines
			.slice(experienceLine + 1)
			.findIndex(
				(line) =>
					line.startsWith('(') || ['ลงชื่อ', 'ยินยอม', 'สำเนา'].some((word) => line.includes(word))
			);

	return {
		file: file.replace('.txt', ''),
		...(educationLine < 0 || experienceLine < 0
			? {}
			: {
					education: lines.slice(educationLine + 1, experienceLine).join('\n'),
					experience: lines
						.slice(experienceLine + 1, endingLine <= experienceLine ? lines.length : endingLine)
						.join('\n')
				})
	};
});

const candidates: OfficialCandidate[] = await (await fetch(CANDIDATES_URL)).json();

const output = candidates.map((c) => {
	const { education, experience } = transcripts.find(({ file }) => c.pdf_url.includes(file)) || {
		education: undefined,
		experience: undefined
	};

	return {
		title: c.title,
		firstName: c.first_name,
		middleName: c.middle_name.trim(),
		lastName: c.last_name,
		province: c.province,
		district: c.district,
		group: c.job_group,
		education,
		experience,
		imageUrl: c.image_url,
		documentUrl: c.pdf_url
	};
});

await Bun.write('candidates.csv', csvFormat(output));

console.log(`total: ${output.length}`);
console.log(`with education: ${output.filter((d) => d.education).length}`);
console.log(`with experience: ${output.filter((d) => d.experience).length}`);
