<script lang="ts">
	import { asString, Column, fetchCsv, Object, type StaticDecode } from 'sheethuahua';
	import { onMount } from 'svelte';

	const gameSchema = Object({
		name: Column('name', asString()),
		releaseYear: Column('releaseYear', asString().optional()),
		positivePercent: Column('positivePercent', asString()),
		woke: Object({
			level: Column('wokeLevel', asString()),
			explanation: Column('explanation', asString().optional())
		}),
		steamAppPath: Column('steamAppPath', asString())
	});

	let games = $state<StaticDecode<typeof gameSchema>[]>([]);

	onMount(async () => {
		games = await fetchCsv('/woke-game-is-bad-game/games.csv', gameSchema);
	});
</script>

<pre>
  {JSON.stringify(games, undefined, 2)}
</pre>
