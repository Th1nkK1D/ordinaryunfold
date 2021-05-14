<script>
	import Metadata from '../components/metadata.svelte';
	import Footer from '../components/footer.svelte';

</script>

<Metadata />

<div
	class="w-full min-h-screen bg-cool-gray-900 text-white flex-1 flex flex-col justify-center items-center m-auto space-y-12 text-center px-3 py-18"
>
	<img src="/logo-white.png" alt="OrdinaryUnfold" class="w-full max-w-96" />

	<div class="space-y-4">
		<div class="flex">
			<a
				href="/th-covid-speech"
				class="mx-auto transform transition-transform duration-200 ease-in-out hover:(scale-102 shadow-xl)"
			>
				<img
					src="/th-covid-speech/og.png"
					class="rounded-lg shadow-lg w-full max-w-86"
					alt="วิวาทะโควิด 19"
				/>
			</a>
		</div>
		<p class="max-w-screen-sm mx-auto">
			We just launch first experimental story about Thailand Covid-19 related speeches [TH],<br />so
			landing page will be redesigned later.
		</p>
	</div>

	<Footer class="opacity-50" />
</div>
