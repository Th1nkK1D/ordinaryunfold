import fetalitiesData from '../../data/myanmar-coup/recent-fatality.csv';

export const fetalities = fetalitiesData.map(({ age, dateOfIncident, ...data }, index) => ({
	id: index,
	age: +age,
	dateOfIncident: new Date(dateOfIncident),
	...data
}));

export type Person = typeof fetalities[0];
