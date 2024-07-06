import { NATIONAL_CANDIDATES_OUTPUT, PROVINCE_CANDIDATES_OUTPUT } from './config';
import { csvFormat, csvParse } from 'd3-dsv';
import { Column, Spreadsheet, Table, parseCSVFromString } from 'sheethuahua';

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

const semifinalGroupTable = Table({
	province: Column.String(),
	first_name: Column.String(),
	last_name: Column.String(),
	คะแนน: Column.Number()
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

			return (await parseCSVFromString(csvText, semifinalGroupTable)).map((c) => ({ group, ...c }));
		})
	)
).flat();

const winnerSheet = Spreadsheet(
	'1zJSO-l1nXAaj0g9YBoCzZrEyunBlRoHFiGsrN2fzDsQ',
	[
		Table('รวมรายชื่อ 200 คน', {
			กลุ่มที่: Column.Number(),
			province: Column.String(),
			title: Column.String(),
			first_name: Column.String(),
			middle_name: Column.OptionalString(),
			last_name: Column.String(),
			คะแนน: Column.Number()
		})
	],
	{ range: 'A2:G' }
);

const winners = await winnerSheet.get('รวมรายชื่อ 200 คน');

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
