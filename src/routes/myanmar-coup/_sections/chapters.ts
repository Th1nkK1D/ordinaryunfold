import { fetalities } from '../_data';
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

const youngestAge = Math.min(...fetalities.filter(({ age }) => age > 0).map(({ age }) => age));

export const chapters: Chapter[] = [
	{
		title: '<mark>When</mark> did the incidents happen?',
		sortBy: (a, z) =>
			a.dateOfIncident.format('YYYY/MM').localeCompare(z.dateOfIncident.format('YYYY/MM')),
		steps: [
			{
				matchedMask: fetalities.map(
					({ dateOfIncident }) => dateOfIncident.format('YYYY/MM') === '2021/02'
				),
				heading: (count) =>
					`A coup d'état in Myanmar began in <mark>1&nbsp;February 2021</mark>. ${count} deads on that month.`,
				description: 'But it was just the beginning'
			},
			{
				matchedMask: fetalities.map(
					({ dateOfIncident }) => dateOfIncident.format('YYYY/MM') === '2021/03'
				),
				heading: (count) =>
					`The situation escalated dramatically in <mark>March 2021</mark>, a total of ${count} lives were taken away.`
			}
		]
	},
	{
		title: '<mark>Who</mark> are they?',
		sortBy: (a, z) => a.organization.localeCompare(z.organization),
		steps: [
			{
				matchedMask: fetalities.map(({ organization }) => organization === 'Civilian'),
				heading: (count) => `${count} people are <mark>civilians</mark>.`,
				description: 'I wonder what were they doing?'
			},
			{
				matchedMask: fetalities.map(({ organization }) => organization === 'Student'),
				heading: (count) => `${count} <mark>students</mark> were killed.`,
				description: 'Future of the country, they said.'
			},
			{
				matchedMask: fetalities.map(({ organization }) =>
					['Teacher', 'Doctor/Nurse', 'Engineer', 'Civil Servant'].includes(organization)
				),
				heading: (count) =>
					`We also lost ${count} <mark>teachers, doctors, nurses, engineers and civil servants</mark>.`,
				description: 'Thank you for your services.'
			}
		]
	},
	{
		title: 'What are their <mark>sexualities?</mark>',
		sortBy: (a, z) => a.sex.localeCompare(z.sex),
		steps: [
			{
				matchedMask: fetalities.map(({ sex }) => sex === 'M'),
				heading: (count) => `The majority of people, ${count} in total, are <mark>males</mark>.`,
				description: `Do they look terrifying? I don't think so.`
			},
			{
				matchedMask: fetalities.map(({ sex }) => sex === 'F'),
				heading: (count) => `${count} <mark>females</mark> were killed too.`
			}
		]
	},
	{
		title: '<mark>How old</mark> are they?',
		sortBy: (a, z) => a.age - z.age,
		steps: [
			{
				matchedMask: fetalities.map(({ age }) => age <= 20),
				heading: (count) => `${count} people are <mark>20 or younger</mark>.`,
				description: 'Who would expect to be this soon?'
			},
			{
				matchedMask: fetalities.map(({ age }) => age === youngestAge),
				heading: () => `<mark>The youngest one</mark> is just ${youngestAge}.`
			},
			{
				matchedMask: fetalities.map(({ age }) => age > 50 && age < 1000),
				heading: (count) => `${count} people are <mark>50 or older</mark>.`,
				description: 'They should have a peaceful life at this age.'
			}
		]
	}
];
