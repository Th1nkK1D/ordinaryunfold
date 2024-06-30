import rawCandidates from '../../data/senates-blind-test/national-candidates.csv?raw';
import { Column, Table, parseCSVFromString, type RowType } from 'sheethuahua';

const CandidatesTable = Table({
	title: Column.String(),
	firstName: Column.String(),
	middleName: Column.OptionalString(),
	lastName: Column.String(),
	group: Column.String(),
	experience: Column.OptionalString(),
	documentUrl: Column.String(),
	isWinner: Column.Boolean()
});

export type Candidate = RowType<typeof CandidatesTable>;

interface Group {
	id: number;
	name: string;
}

export async function load() {
	const candidates = await parseCSVFromString(rawCandidates, CandidatesTable);
	const groups: Group[] = await (
		await fetch('https://github.com/PanJ/senate67/raw/main/job-groups.json')
	).json();

	const groupMap = new Map(groups.map(({ id, name }) => [id, name]));

	return { candidates, groupMap };
}
