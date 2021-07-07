import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import fetalitiesData from '../../data/myanmar-coup/recent-fatality.csv';

dayjs.extend(customParseFormat);

export const fetalities = fetalitiesData
	.map(({ age, dateOfIncident, ...data }) => ({
		age: age.length > 0 ? +age : 9999,
		dateOfIncident: dayjs(dateOfIncident, 'DD-MMM-YY'),
		...data
	}))
	.sort((a, z) =>
		a.dateOfIncident.format('YYMMDD').localeCompare(z.dateOfIncident.format('YYMMDD'))
	)
	.map((data, index) => ({
		id: index,
		...data
	}));

export type Person = typeof fetalities[0];
