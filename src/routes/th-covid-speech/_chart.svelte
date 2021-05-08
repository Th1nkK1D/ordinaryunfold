<script lang="ts">
	import type { DailyNewCase } from './index.svelte';

	export let dailyNewCases: DailyNewCase[];
</script>

<div>
	{dailyNewCases}
</div>
