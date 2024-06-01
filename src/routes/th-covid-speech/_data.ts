import dailycases from '../../data/th-covid-speech/dailycases.json';
import newsData from '../../data/th-covid-speech/news.csv';
import speakers from '../../data/th-covid-speech/speakers.csv';
import speechesData from '../../data/th-covid-speech/speeches.csv';

export interface Speaker {
	id: string;
	name: string;
	position: string;
}

export interface Speech {
	type: 'speech';
	date: Date;
	quote: string;
	speaker: Speaker;
	source: string;
	url: string;
}

export interface News {
	type: 'news';
	date: Date;
	content: string;
	source: string;
	url: string;
}

export type ContentBlock = {
	id: number;
} & (Speech | News);

const speeches: Speech[] = speechesData.map(({ date, speaker, ...rest }) => ({
	type: 'speech' as const,
	date: new Date(date),
	speaker: speakers.find(({ id }) => id === speaker),
	...rest
}));

const news: News[] = newsData.map(({ date, ...rest }) => ({
	type: 'news' as const,
	date: new Date(date),
	...rest
}));

export const contentBlocks: ContentBlock[] = [...speeches, ...news]
	.sort((a, z) => a.date.valueOf() - z.date.valueOf())
	.map((content, index) => ({ id: index + 1, ...content }));

export const dailyNewCases = dailycases.dailyNewCases.map(({ date, count }) => ({
	date: new Date(date),
	count
}));

export const lastUpdated = dailycases.lastUpdated;
