import rawCandidates from '../../data/senates-blind-test/candidates-final.csv?raw';
import rawInterestingWinners from '../../data/senates-blind-test/interesting-winners.csv?raw';
import groups from '../../data/senates-blind-test/job-groups.json';
import { Column, Table, parseCSVFromString } from 'sheethuahua';

const candidatesTable = Table({
	title: Column.String(),
	firstName: Column.String(),
	middleName: Column.OptionalString(),
	lastName: Column.String(),
	group: Column.Number(),
	province: Column.String(),
	experience: Column.OptionalString(),
	documentUrl: Column.String(),
	isWinner: Column.Boolean(),
	score: Column.Number()
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

	return {
		candidates: candidates.map(
			({ title, firstName, middleName, lastName, documentUrl, ...rest }) => ({
				fullname: `${title}${[firstName, middleName, lastName].join(' ')}`.replace(/\s+/g, ' '),
				...rest,
				imageName: documentUrl.split('/').at(-1),
				interestingScore: interestingWinners.some(
					(w) => w.firstName === firstName && w.lastName === lastName
				)
					? 1
					: 0
			})
		),
		groups
	};
}

export type Candidate = Awaited<ReturnType<typeof load>>['candidates'][number];
