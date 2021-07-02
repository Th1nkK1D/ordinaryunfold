<script>
	import Metadata from '../../components/metadata.svelte';
	import Logo from '../../components/logo.svelte';
	import Avatar from './_people/avatar.svelte';
</script>

<Metadata title="Myanmar Coup 2021" />

<div class="flex flex-col w-full bg-true-gray-900 text-white">
	<section class="flex flex-col justify-between min-h-screen p-8 md:p-20">
		<Logo />
		<h1 class="text-5xl md:text-9xl font-head font-bold">PRAY FOR<br />MYANMAR</h1>
		<div class="font-head md:space-y-2">
			<p class="text-2xl md:text-5xl font-bold text-yellow-500">845 people</p>
			<p class="text-lg md:text-2xl">have been confirmed killed by junta coup since Febuary 2021</p>
		</div>
		<p class="italic text-sm">Last updated on 5 Jun 2021</p>
		<div class="flex justify-end">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-12 fill-yellow-500">
				<path d="M0 0h24v24H0V0z" fill="none" /><path
					d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
				/>
			</svg>
		</div>
	</section>
	<Avatar />
</div>
