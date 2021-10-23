import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import fatalitiesData from '../../data/myanmar-coup/recent-fatality.csv';

dayjs.extend(customParseFormat);

export const fatalities = fatalitiesData
	.map(({ age, dateOfIncident, ...data }) => ({
		age: +age || 9999,
		dateOfIncident: dayjs(dateOfIncident || new Date(), 'DD-MMM-YY'),
		...data
	}))
	.sort((a, z) =>
		a.dateOfIncident.format('YYMMDD').localeCompare(z.dateOfIncident.format('YYMMDD'))
	)
	.map((data, index) => ({
		id: index,
		...data
	}));

export type Person = typeof fatalities[0];
