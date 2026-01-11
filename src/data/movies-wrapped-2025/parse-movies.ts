import rawData from './movies.csv?raw';
import dayjs from 'dayjs';
import {
	parseCsv,
	Object,
	Column,
	asString,
	createTransformer,
	asNumber,
	asOneOf,
	asArray,
	type StaticDecode
} from 'sheethuahua';

const asDayjs = createTransformer((value) => dayjs(`${value} 2025`));

const asTimeObject = createTransformer((value) => {
	const [hour, minute] = value.split(':');
	return { hour: +hour, minute: +minute };
});

const asSeatLocation = createTransformer((value) => {
	const [row, seat] = value.split('');
	return { row, seat: +seat };
});

const asMinutes = createTransformer((value) => {
	const [h, m] = value.split(' ');
	return +h.replace('h', '') * 60 + +m.replace('m', '');
});

const movieSchema = Object({
	name: Column('name', asString()),
	date: Column('date', asDayjs),
	time: Column('time', asTimeObject),
	location: Column('location', asString()),
	cinema: Column('cinema', asString().optional()),
	seat: Column('seat', asSeatLocation.optional()),
	city: Column('city', asString()),
	mainLanguage: Column('main_language', asString()),
	releaseYear: Column('release_year', asNumber()),
	duration: Column('duration', asMinutes),
	genres: Column('genres', asArray(asString(), '/')),
	companion: Column('companion', asOneOf(['solo', 'partner', 'family', 'friend']))
});

export const movies = parseCsv(rawData, movieSchema);
export type Movie = StaticDecode<typeof movieSchema>;
