<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Logo from '../../../components/logo.svelte';
	import Button from './button.svelte';
	import Card from './card.svelte';

	export let choiceLabels: string[];

	const dispatch = createEventDispatcher();
</script>

<div class="relative h-lvh w-full overflow-hidden">
	<div
		class="absolute inset-0 flex flex-col items-center justify-around overflow-hidden border-[8px] border-white/15 bg-[#2B815F] px-2 pb-12 pt-4 text-white transition-colors duration-500 md:gap-12 md:border-[12px] md:pb-36 md:pt-12"
	>
		<Logo />
		<div class="flex flex-col gap-4 text-center md:gap-6">
			<h1 class="font-chonburi text-4xl md:text-7xl">Senates Blind Test</h1>
			<p class="font-charmonman text-xl md:text-3xl">
				เกมทายใจ ใครเป็นผู้ชนะการเลือกตั้งสว. จากเอกสารแนะนำตัว ๕ บรรทัด
			</p>
		</div>
		<div class="flex max-w-screen-md flex-col gap-2 indent-8">
			<p>
				จากผู้สมัครทั้งหมด ๘๐๐ คน ในการเลือกตั้งสว. รอบสุดท้ายของปี ๒๕๖๗
				ผู้ที่ได้คะแนนโหวตจากสว.ด้วยกันเองสูงสุด ๑๐ คนในแต่ละกลุ่มอาชีพ ๒๐ กลุ่ม (รวมเป็น ๒๐๐ คน)
				จะได้รับการแต่งตั้งเป็นสว. <a
					href="https://senates67.com"
					target="_blank"
					rel="noopener noreferrer"
					class="underline opacity-60">(อ่านเพิ่มเติมเกี่ยวกับระบบการเลือกตั้งสว.)</a
				>
			</p>
			<p>
				เกม "สว. Blind Test จะสุ่มกลุ่มอาชีพพร้อมกับ
				"ประวัติการทํางานหรือประสบการณ์ในการทํางานในกลุ่มที่สมัคร (ไม่เกิน ๕ บรรทัด)" จากใบสมัครของ
				สว. ๔ คน ผู้เล่นต้องทายว่าคนที่ได้รับเลือกเป็นสว. ๑ ใน ๔ คนนั้นคือใคร?
			</p>
			<p class="text-sm opacity-60">
				หมายเหตุ: เราใช้เทคนิค OCR ในการแปลงรูปใบสมัครต้นฉบับให้หลายเป็นตัวหนังสือ
				อาจมีข้อมูลที่คลาดเคลื่อน สามารถรายงานความผิดพลาดได้ แต่เราจะไม่รับผิดชอบใดๆ
			</p>
		</div>
		<Button class="z-50 bg-white text-[#2B815F] shadow-lg" on:click={() => dispatch('start')}
			>เริ่มเล่น</Button
		>
	</div>
	<div class="absolute bottom-0 left-1/2 flex w-[60vw] -translate-x-1/2 flex-row md:max-w-xl">
		{#each choiceLabels as label, i}
			<div class="relative flex-1 transition-transform hover:-translate-y-2">
				<Card
					class="absolute left-1/2 h-[20vw] max-h-32 w-[30vw] max-w-64"
					style="transform: translate(-50%, -{[80, 90, 90, 80][i]}%) rotate({-6 + 3 * i}deg);"
					heading={label}
					disabled
				/>
			</div>
		{/each}
	</div>
</div>
