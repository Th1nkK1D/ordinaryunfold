import { asNumber, asString, Column, fetchCsv, Object, type StaticDecode } from 'sheethuahua';

const gameSchema = Object({
	name: Column('name', asString()),
	releaseYear: Column('releaseYear', asString().optional()),
	positivePercent: Column('positivePercent', asString()),
	woke: Object({
		level: Column('wokeLevel', asNumber()),
		explanation: Column('explanation', asString().optional())
	}),
	steamAppPath: Column('steamAppPath', asString())
});

export type Game = StaticDecode<typeof gameSchema>;

export const fetchGames = () => fetchCsv('/woke-game-is-bad-game/games.csv', gameSchema);
