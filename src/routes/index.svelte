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

	<div class="flex flex-row justify-center items-center space-x-2 mt-24 md:mt-48">
		<div class="-md:text-sm">Follow us on</div>
		<a
			href="https://www.facebook.com/ordinaryunfold"
			target="_blank"
			rel="noreferrer noopener"
			class="text-gray-500 hover:text-light-blue-600"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 md:w-8"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg
			></a
		>
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
