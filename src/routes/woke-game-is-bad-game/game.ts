import { asNumber, asString, Column, fetchCsv, Object, type StaticDecode } from 'sheethuahua';

export const wokeLevelMap = [
	{
		label: 'Not Woke',
		description: 'No Woke themes present (Recommended)',
		bgClass: 'bg-blue-400',
		textClass: 'text-blue-300'
	},
	{
		label: 'Subtle Woke',
		description: 'Woke themes present with subtle/no specific messaging (Informational)',
		bgClass: 'bg-purple-500',
		textClass: 'text-purple-400'
	},
	{
		label: 'Overty Woke',
		description: 'Woke themes present with overt messaging (Not Recommended)',
		bgClass: 'bg-red-400',
		textClass: 'text-red-400'
	}
];

const gameSchema = Object({
	name: Column('name', asString()),
	releaseYear: Column('releaseYear', asNumber().optional()),
	positivePercent: Column('positivePercent', asNumber()),
	woke: Object({
		level: Column('wokeLevel', asNumber()),
		explanation: Column('explanation', asString().optional())
	}),
	steamAppPath: Column('steamAppPath', asString())
});

export type Game = StaticDecode<typeof gameSchema>;

export const fetchGames = () => fetchCsv('/woke-game-is-bad-game/games.csv', gameSchema);
