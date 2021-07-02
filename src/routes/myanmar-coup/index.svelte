<script>
	import Scrollama from '../../components/scrollama.svelte';
	import Metadata from '../../components/metadata.svelte';
	import PeopleBackground from './_people/people-background.svelte';
	import Chapter from './_sections/chapter.svelte';
	import Landing from './_sections/landing.svelte';
</script>

<Metadata title="Myanmar Coup 2021" />

<PeopleBackground />

<Scrollama
	class="flex flex-col w-full text-white"
	on:stepenter={({ detail }) => console.log(detail)}
>
	<Landing />
	<Chapter>
		<h2><mark>When</mark> did the incident happended?</h2>
	</Chapter>
</Scrollama>

<style>
	h2 {
		@apply font-head font-bold text-6xl;
	}

	mark {
		@apply bg-transparent text-yellow-500;
	}
</style>
