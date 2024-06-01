<script lang="ts">
	import anime from 'animejs';
	import { onDestroy, onMount } from 'svelte';

	const COLORS = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500'];

	let containerEl: HTMLDivElement;
	let intervalTimer: NodeJS.Timer;

	onMount(() => {
		intervalTimer = setInterval(async () => {
			const circleEl = document.createElement('div');
			const size = randomIntBetween(400, 800);
			const bgColorClass = COLORS[randomIntBetween(0, COLORS.length - 1)];

			circleEl.classList.add(
				'rounded-full',
				'absolute',
				'opacity-0',
				'transform',
				'-translate-x-1/2',
				'-translate-y-1/2',
				'scale-50',
				'md:scale-100',
				bgColorClass
			);
			circleEl.style.width = `${size}px`;
			circleEl.style.height = `${size}px`;
			circleEl.style.filter = `blur(${size / 4}px)`;
			circleEl.style.top = `${randomIntBetween(0, 100)}%`;
			circleEl.style.left = `${randomIntBetween(0, 100)}%`;

			containerEl.appendChild(circleEl);

			await anime({
				targets: circleEl,
				opacity: [0, 0.25, 0],
				duration: randomIntBetween(8000, 12000),
				easing: 'easeInOutQuad'
			}).finished;

			circleEl.remove();
		}, 1200);
	});

	onDestroy(() => clearInterval(intervalTimer));

	function randomIntBetween(min: number, max: number) {
		return Math.round(min + Math.random() * (max - min));
	}
</script>

<div bind:this={containerEl} class="fixed inset-0 -z-10 bg-[#0f0f0f]" />
