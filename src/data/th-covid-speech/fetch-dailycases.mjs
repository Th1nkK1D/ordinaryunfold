import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
import https from 'https';

async function fetchData() {
	const res = await fetch('https://covid19.ddc.moph.go.th/api/open/timeline', {
		agent: new https.Agent({ rejectUnauthorized: false })
	});

	if (res.ok) {
		const { Data } = await res.json();

		const dailyNewCases = Data.map(({ Date: date, NewConfirmed }) => ({
			date: new Date(date),
			count: NewConfirmed
		}));

		writeFileSync(
			'./dailycases.json',
			JSON.stringify({ lastUpdated: dailyNewCases[dailyNewCases.length - 1].date, dailyNewCases })
		);
	} else {
		console.error('Failed to fetch API');
	}
}

fetchData();
