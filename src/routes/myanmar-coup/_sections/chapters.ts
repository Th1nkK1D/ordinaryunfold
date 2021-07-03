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

export const chapters: Chapter[] = [
	{
		title: '<mark>Who</mark> are they?',
		sortBy: (a, z) => a.organization.localeCompare(z.organization),
		steps: [
			{
				matchedMask: fetalities.map(({ organization }) => organization === 'Civilian'),
				heading: (count) => `${count} people are <mark>civilians</mark>`,
				description: 'who would think the last day will came this soon?'
			},
			{
				matchedMask: fetalities.map(({ organization }) => organization === 'Student'),
				heading: (count) => `${count} <mark>students</mark> were killed`,
				description: 'future of the country, they said.'
			},
			{
				matchedMask: fetalities.map(({ organization }) =>
					['Teacher', 'Doctor/Nurse', 'Engineer', 'Civil Servant'].includes(organization)
				),
				heading: (count) =>
					`We also lost ${count} <mark>teachers, doctor, nurse, engineer and civil servant</mark>`,
				description: 'we appreciate your work'
			}
		]
	},
	{
		title: '<mark>How old</mark> are they?',
		sortBy: (a, z) => a.age - z.age,
		steps: []
	},
	{
		title: 'What are their <mark>sexuality?</mark>',
		sortBy: (a, z) => a.sex.localeCompare(z.sex),
		steps: []
	},
	{
		title: '<mark>When</mark> did the incident happended?',
		sortBy: (a, z) => a.dateOfIncident.getTime() - z.dateOfIncident.getTime(),
		steps: []
	}
];
