interface CovidData {
	Confirmed: number;
	Date: string;
	Deaths: number;
	Hospitalized: number;
	NewConfirmed: number;
	NewDeaths: number;
	NewHospitalized: number;
	NewRecovered: number;
	Recovered: number;
}

interface CovidResponse {
	Data: CovidData[];
	DevBy: string;
	SeverBy: string;
	Source: string;
	UpdateDate: string;
}

const DATA_FILE = './dailycases.json';
const API_ENDPOINT = 'https://covid19.th-stat.com/json/covid19v2/getTimeline.json';

const res = await fetch(API_ENDPOINT);

if (res.ok) {
	const { Data } = (await res.json()) as CovidResponse;

	const oldData = JSON.parse(await Deno.readTextFile(DATA_FILE));
	const lastUpdated = new Date(oldData.lastUpdated);

	const newCases = Data.map(({ Date: date, NewConfirmed }) => ({
		date: new Date(date),
		count: NewConfirmed
	})).filter(({ date }) => date > lastUpdated);

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
