import { NATIONAL_CANDIDATES_OUTPUT, PROVINCE_CANDIDATES_OUTPUT } from './config';
import { csvFormat, csvParse } from 'd3-dsv';
import { Column, Spreadsheet, Object, parseCsv, asString, asNumber } from 'sheethuahua';

interface ProvinceDistrict {
	id: number;
	name: string;
	districts: {
		id: number;
		name: string;
	}[];
}

const candidates = csvParse(await Bun.file(PROVINCE_CANDIDATES_OUTPUT).text());

const groupNumbers = new Array(20).fill(null).map((_, i) => i + 1);

const provinceDistricts: ProvinceDistrict[] = await (
	await fetch('https://github.com/PanJ/senate67/raw/main/province-districts.json')
).json();

const semifinalGroupSchema = Object({
	province: Column('province', asString()),
	first_name: Column('first_name', asString()),
	last_name: Column('last_name', asString()),
	คะแนน: Column('คะแนน', asString())
});

const finalCandidates = (
	await Promise.all(
		groupNumbers.map(async (group) => {
			const res = await fetch(
				`https://docs.google.com/spreadsheets/d/11XhPY0YOzNjmOyIOd8AbsmncLg2M3ThC9UY_d4P-3Wc/gviz/tq?${new URLSearchParams(
					{
						sheet: `กลุ่ม ${group}`,
						tqx: 'out:csv',
						range: 'A2:D'
					}
				)}`
			);

			const csvText = (await res.text()).replaceAll('Province', 'province');

			return parseCsv(csvText, semifinalGroupSchema).map((c) => ({ group, ...c }));
		})
	)
).flat();

const winners = await Spreadsheet('1zJSO-l1nXAaj0g9YBoCzZrEyunBlRoHFiGsrN2fzDsQ').get(
	'รวมรายชื่อ 200 คน',
	Object(
		{
			กลุ่มที่: Column('', asNumber()),
			province: Column('', asString()),
			title: Column('', asString()),
			first_name: Column('', asString()),
			middle_name: Column('', asString().optional()),
			last_name: Column('', asString()),
			คะแนน: Column('', asNumber())
		},
		{ range: 'A2:G' }
	)
);

const output = candidates
	.filter((c) =>
		finalCandidates.some((fc) => c.firstName === fc.first_name && c.lastName === fc.last_name)
	)
	.map((c) => {
		const province = provinceDistricts.find((p) => p.id === +c.province);

		return {
			...c,
			province: province?.name,
			district: province?.districts.find((d) => d.id === +c.district)?.name,
			score: finalCandidates.find(
				(fc) => c.firstName === fc.first_name && c.lastName === fc.last_name
			)?.คะแนน,
			isWinner: winners.some((w) => c.firstName === w.first_name && c.lastName === w.last_name)
		};
	});

console.log(`Matched national cadidates: ${output.length}`);
console.log(`Winners: ${output.filter((c) => c.isWinner).length}`);

await Bun.write(NATIONAL_CANDIDATES_OUTPUT, csvFormat(output));
