import { fatalities } from '../_data';
import type { Person } from '../_data';

export interface Step {
	matchedMask: boolean[];
	heading: (count: number) => string;
	description?: string;
}
interface Chapter {
	title: string;
	sortBy: (a: Person, b: Person) => number;
	steps: Step[];
}

const youngestAge = Math.min(...fatalities.filter(({ age }) => age > 0).map(({ age }) => age));

export const chapters: Chapter[] = [
	{
		title: '<mark>What</mark> happended?',
		sortBy: (a, z) => a.id - z.id,
		steps: [
			{
				matchedMask: [],
				heading: () =>
					`A coup d'état in Myanmar began in <mark>1&nbsp;February&nbsp;2021</mark> by the armed forces led by Min Aung Hlaing`,
				description: `A national state of emergency was declared for a year. The country's civilian leader, Aung San Suu Kyi, was detained. Protests over the coup appeared around the country.`
			},
			{
				matchedMask: fatalities.map(
					({ dateOfIncident }) => dateOfIncident.format('DDMMYY') === '200221'
				),
				heading: (count) =>
					`<mark>20 Febuary 2021</mark>, ${count} unarmed protesters were killed by security forces.`,
				description: `One of them was a 16-year-old boy.`
			},
			{
				matchedMask: fatalities.map(
					({ dateOfIncident }) => dateOfIncident.format('MMYY') === '0321'
				),
				heading: (count) =>
					`The situation escalated dramatically in <mark>March 2021</mark>, total ${count} people were killed.`,
				description: 'It was a bloodbath.'
			},
			{
				matchedMask: fatalities.map(
					({ dateOfIncident }) => dateOfIncident.format('DDMMYY') === '270321'
				),
				heading: (count) =>
					`In that amount, ${count} incidents happend in just a single day: <mark>27 March 2021</mark>`,
				description: 'That was in the deadliest day since the coup.'
			}
		]
	},
	{
		title: '<mark>Who</mark> are they?',
		sortBy: (a, z) => a.organization.localeCompare(z.organization),
		steps: [
			{
				matchedMask: fatalities.map(({ organization }) => organization === 'Civilian'),
				heading: (count) => `${count} people are <mark>civilians</mark>.`,
				description: 'I wonder what were they doing?'
			},
			{
				matchedMask: fatalities.map(({ organization }) => organization === 'Student'),
				heading: (count) => `${count} <mark>students</mark> were killed.`,
				description: 'Future of the country, they said.'
			},
			{
				matchedMask: fatalities.map(({ organization }) =>
					['Teacher', 'Doctor/Nurse', 'Engineer', 'Civil Servant'].includes(organization)
				),
				heading: (count) =>
					`We also lost ${count} <mark>teachers, doctors, nurses, engineers and civil servants</mark>.`,
				description: 'Thank you for your services.'
			}
		]
	},
	{
		title: 'Are they <mark>males or females?</mark>',
		sortBy: (a, z) => a.sex.localeCompare(z.sex),
		steps: [
			{
				matchedMask: fatalities.map(({ sex }) => sex === 'M'),
				heading: (count) => `The majority of people, ${count} in total, are <mark>males</mark>.`,
				description: `Do they look terrifying? I don't think so.`
			},
			{
				matchedMask: fatalities.map(({ sex }) => sex === 'F'),
				heading: (count) => `${count} <mark>females</mark> were killed too.`
			}
		]
	},
	{
		title: '<mark>How old</mark> are they?',
		sortBy: (a, z) => a.age - z.age,
		steps: [
			{
				matchedMask: fatalities.map(({ age }) => age <= 20),
				heading: (count) => `${count} people are <mark>20 or younger</mark>.`,
				description: 'Who would expect to be this soon?'
			},
			{
				matchedMask: fatalities.map(({ age }) => age === youngestAge),
				heading: () => `<mark>The youngest one</mark> is just ${youngestAge} year old.`
			},
			{
				matchedMask: fatalities.map(({ age }) => age >= 50 && age < 1000),
				heading: (count) => `${count} people are <mark>50 or older</mark>.`,
				description: 'They should have a peaceful life at this age.'
			},
			{
				matchedMask: fatalities.map(({ age }) => age > 20 && age < 50),
				heading: (count) =>
					`And most of them, ${count} people, are <mark>between 20 and 50</mark>.`,
				description: 'Main forces of the country had gone.'
			}
		]
	}
];
