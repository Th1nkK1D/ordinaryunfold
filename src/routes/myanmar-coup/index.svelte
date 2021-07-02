<script>
	import Metadata from '../../components/metadata.svelte';
	import PeopleBackground from './_people/people-background.svelte';
	import Chapter from './_sections/chapter.svelte';
	import Landing from './_sections/landing.svelte';
</script>

<Metadata title="Myanmar Coup 2021" />

<PeopleBackground />

<div class="flex flex-col w-full text-white">
	<Landing />
	<Chapter>
		<h2><mark>When</mark> did the incident happended?</h2>
	</Chapter>
</div>

<style>
	h2 {
		@apply font-head font-bold text-6xl;
	}

	mark {
		@apply bg-transparent text-yellow-500;
	}
</style>
