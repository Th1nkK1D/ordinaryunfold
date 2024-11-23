import rawCandidates from '../../data/senates-blind-test/candidates-final.csv?raw';
import rawInterestingWinners from '../../data/senates-blind-test/interesting-winners.csv?raw';
import groups from '../../data/senates-blind-test/job-groups.json';
import { Column, Object, parseCsv, asString, asNumber, asBoolean } from 'sheethuahua';

const candidateSchema = Object({
	title: Column('title', asString()),
	firstName: Column('firstName', asString()),
	middleName: Column('middleName', asString().optional()),
	lastName: Column('lastName', asString()),
	group: Column('group', asNumber()),
	province: Column('province', asString()),
	experience: Column('experience', asString().optional()),
	documentUrl: Column('documentUrl', asString()),
	isWinner: Column('isWinner', asBoolean()),
	score: Column('score', asNumber())
});

const interestingWinnerSchema = Object({
	firstName: Column('firstName', asString()),
	lastName: Column('lastName', asString())
});

export interface Group {
	id: number;
	name: string;
}

export function load() {
	const candidates = parseCsv(rawCandidates, candidateSchema);
	const interestingWinners = parseCsv(rawInterestingWinners, interestingWinnerSchema);

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
