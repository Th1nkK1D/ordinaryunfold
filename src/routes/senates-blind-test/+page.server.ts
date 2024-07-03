import rawInterestingWinners from '../../data/senates-blind-test/interesting-winners.csv?raw';
import rawCandidates from '../../data/senates-blind-test/national-candidates.csv?raw';
import { Column, Table, parseCSVFromString, type RowType } from 'sheethuahua';

const candidatesTable = Table({
	title: Column.String(),
	firstName: Column.String(),
	middleName: Column.OptionalString(),
	lastName: Column.String(),
	group: Column.Number(),
	experience: Column.OptionalString(),
	documentUrl: Column.String(),
	isWinner: Column.Boolean()
});

const interestingWinnersTable = Table({
	firstName: Column.String(),
	lastName: Column.String()
});

export interface Group {
	id: number;
	name: string;
}

export async function load() {
	const candidates = await parseCSVFromString(rawCandidates, candidatesTable);
	const interestingWinners = await parseCSVFromString(
		rawInterestingWinners,
		interestingWinnersTable
	);
	const groups: Group[] = await (
		await fetch('https://github.com/PanJ/senate67/raw/main/job-groups.json')
	).json();

	return {
		candidates: candidates.map(({ title, firstName, middleName, lastName, ...rest }) => ({
			fullname: `${title}${[firstName, middleName, lastName].join(' ')}`.replace(/\s+/g, ' '),
			...rest,
			interestingScore: interestingWinners.some(
				(w) => w.firstName === firstName && w.lastName === lastName
			)
				? 1
				: 0
		})),
		groups
	};
}

export type Candidate = Awaited<ReturnType<typeof load>>['candidates'][number];
