interface Match {
	id: string;
	league: string;
	kickoffAt: number;
	status: string;
	teams: string[];
	scores: { [minutes: string]: string };
	url: string;
}

type Result = 'W' | 'D' | 'L';

type StatsPerMin = Record<Result, number[]> & {
	name: string;
	points: number;
	GD: number;
};

const matches = ((await Bun.file(`${import.meta.dir}/matches-2324.json`).json()) as Match[]).filter(
	// TODO: prototype only with bundesliga
	(match) => match.league === 'Bundesliga'
);

console.log(`Total ${matches.length} matches`);

const maxFirstExtraTime = getMaxExtraTime(45);
const maxSecondExtraTime = getMaxExtraTime(90);

console.log({ maxFirstExtraTime, maxSecondExtraTime });

const timeScale = [
	...createStringRange(0, 45),
	...createStringRange(1, maxFirstExtraTime).map((num) => `45+${num}`),
	...createStringRange(46, 90),
	...createStringRange(1, maxSecondExtraTime).map((num) => `90+${num}`)
];

console.log(timeScale);

const teamStats: { [team: string]: StatsPerMin } = {};

matches.forEach(({ teams, scores }) => {
	teams.forEach((team) => {
		if (!teamStats[team]) {
			teamStats[team] = {
				name: team,
				points: 0,
				GD: 0,
				W: new Array(timeScale.length).fill(0),
				D: new Array(timeScale.length).fill(0),
				L: new Array(timeScale.length).fill(0)
			};
		}
	});

	let currentResult: [Result, Result] = ['D', 'D'];
	let currentScore: [number, number] = [0, 0];

	timeScale.forEach((minutes, mi) => {
		if (scores[minutes]) {
			currentScore = scores[minutes].split('-').map((s) => +s) as [number, number];
			currentResult =
				currentScore[0] > currentScore[1]
					? ['W', 'L']
					: currentScore[0] < currentScore[1]
						? ['L', 'W']
						: ['D', 'D'];
		}

		teams.forEach((team, ti) => {
			teamStats[team][currentResult[ti]][mi]++;
		});
	});

	teams.forEach((team, ti) => {
		teamStats[team].points += getPointsFromResult(currentResult[ti]);
		teamStats[team].GD += currentScore[ti] - currentScore[(ti + 1) % 2];
	});
});

const output = {
	timeScale,
	teams: Object.values(teamStats).sort((a, z) => z.points * 100 + z.GD - (a.points * 100 + a.GD))
};

console.table(output.teams.map(({ name, points, GD }) => ({ name, points, GD })));

Bun.write(`./static/comeback-king-or-flopper/json/bundesliga.json`, JSON.stringify(output));

function getMaxExtraTime(minutes: number): number {
	const keyword = `${minutes}+`;
	return Math.max(
		...new Set(
			matches.flatMap(({ scores }) =>
				Object.keys(scores)
					.filter((time) => time.includes(keyword))
					.map((time) => +time.replace(keyword, ''))
			)
		)
	);
}

function createStringRange(from: number, to: number): string[] {
	return new Array(to - from + 1).fill(null).map((_, i) => `${from + i}`);
}

function getPointsFromResult(result: Result): number {
	switch (result) {
		case 'W':
			return 3;
		case 'D':
			return 1;
		case 'L':
			return 0;
	}
}
