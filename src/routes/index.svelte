<script>
	import Metadata from '../components/metadata.svelte';
	import Footer from '../components/footer.svelte';
	import ProjectCard from '../components/project-card.svelte';
</script>

<Metadata />

<div class="flex flex-col min-h-screen">
	<section class="bg-geometries-top bg-top space-y-4 text-center px-4">
		<img src="/images/logo-black.png" alt="OrdinaryUnfold" class="w-full max-w-72 md:max-w-96" />
		<p class="md:text-lg">Bite-size visualization and storytelling experiments</p>
	</section>

	<div
		class="flex-1 flex flex-col w-full max-w-screen-lg px-2 space-y-6 md:(px-6 space-y-12) mx-auto "
	>
		<ProjectCard
			title="วิวาทะโควิด 19 (Thailand Covid Speeches)"
			description="ใคร ได้พูดอะไร ในแต่ละช่วงของวิกฤติกาล"
			href="/th-covid-speech/"
			image="/th-covid-speech/og2.png"
			date="14 May 2021"
			lang="TH"
		/>
	</div>

	<section class="bg-geometries-bottom bg-bottom px-2 md:px-6">
		<Footer class="opacity-50 text-center" />
	</section>
</div>

<style>
	section {
		@apply flex flex-col justify-center items-center bg-no-repeat bg-contain h-30vw min-h-64;
	}
</style>
