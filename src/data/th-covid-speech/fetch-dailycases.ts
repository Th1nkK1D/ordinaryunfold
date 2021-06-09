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

const res = await fetch('https://covid19.th-stat.com/json/covid19v2/getTimeline.json');

if (res.ok) {
	const { Data } = (await res.json()) as CovidResponse;

	const dailyNewCases = Data.map(({ Date: date, NewConfirmed }) => ({
		date: new Date(date),
		count: NewConfirmed
	}));

	await Deno.writeTextFile(
		'./dailycases.json',
		JSON.stringify({ lastUpdated: dailyNewCases[dailyNewCases.length - 1].date, dailyNewCases })
	);
} else {
	console.error('Failed to fetch API');
}
