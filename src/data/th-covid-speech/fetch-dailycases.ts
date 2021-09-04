interface DailyRecord {
	txn_date: string;
	new_case: number;
	total_case: number;
	new_case_excludeabroad: number;
	total_case_excludeabroad: number;
	new_death: number;
	total_death: number;
	new_recovered: number;
	total_recovered: number;
	update_date: string;
}

const DATA_FILE = './dailycases.json';
const API_ENDPOINT = 'https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all';

const res = await fetch(API_ENDPOINT);

if (res.ok) {
	const records = (await res.json()) as DailyRecord[];

	const oldData = JSON.parse(await Deno.readTextFile(DATA_FILE));
	const lastUpdated = new Date(oldData.lastUpdated);

	const newCases = records
		.map(({ txn_date, new_case }) => ({
			date: new Date(`${txn_date} GMT+07:00`),
			count: new_case
		}))
		.filter(({ date }) => date > lastUpdated);

	await Deno.writeTextFile(
		DATA_FILE,
		JSON.stringify({
			lastUpdated: newCases[newCases.length - 1].date,
			dailyNewCases: [...oldData.dailyNewCases, ...newCases]
		})
	);
} else {
	console.error('Failed to fetch API');
}
