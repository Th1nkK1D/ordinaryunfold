<script lang="ts">
	import Logo from '../../../components/logo.svelte';
	import Button from './button.svelte';
	import Card from './card.svelte';
	import ExternalLink from '../../../components/external-link.svelte';

	interface Props {
		choiceLabels: string[];
		onstart: () => unknown;
	}

	let { choiceLabels, onstart }: Props = $props();
</script>

<div class="relative h-lvh w-full overflow-hidden">
	<div
		class="absolute inset-0 flex flex-col items-center justify-around overflow-hidden border-[8px] border-white/15 bg-[#2B815F] px-2 pb-12 pt-4 text-white transition-colors duration-500 md:gap-12 md:border-[12px] md:pb-36 md:pt-12"
	>
		<Logo />
		<div class="flex flex-col gap-4 text-center md:gap-6">
			<h1 class="font-chonburi text-4xl md:text-7xl">สว. Blind Test</h1>
			<p class="font-charmonman text-xl md:text-3xl">
				เกมทายใจ ใครเป็นผู้ชนะการเลือกตั้งจากเอกสารแนะนำตัว ๕ บรรทัด
			</p>
		</div>
		<div class="flex max-w-screen-md flex-col gap-2">
			<p class="indent-6 md:indent-8">
				จากผู้สมัคร ๘๐๐ คน ในการเลือกตั้งสว. รอบสุดท้ายของปี ๒๕๖๗ ผู้ที่ได้คะแนนโหวตจากสว.
				ด้วยกันเองสูงสุด ๑๐ คนในแต่ละกลุ่มอาชีพ ๒๐ กลุ่ม จะได้รับการแต่งตั้งเป็นสว. <ExternalLink
					href="https://senate67.com/#meet-the-campaign"
					class="underline opacity-60"
				>
					(อ่านระบบการเลือกตั้ง)
				</ExternalLink>
				เกมจะสุ่ม "ประวัติการทํางานหรือประสบการณ์ในการทํางานในกลุ่มที่สมัคร (ไม่เกิน ๕ บรรทัด)" จากใบสมัครของ
				สว. ๔ คนในแต่ละกลุ่มอาชีพ ผู้เล่นต้องทายว่า ๑ คนที่ได้คะแนนสูงสุดและมีสิทธิ์ได้รับการแต่งตั้งเป็นสว.
				คือใคร?
			</p>
			<p class="text-sm opacity-60">
				หมายเหตุ: ๑. เราใช้คอมพิวเตอร์แปลงรูปใบสมัครจากกกต.ให้หลายเป็นตัวหนังสือ (OCR)
				อาจมีข้อมูลที่คลาดเคลื่อน โปรดตรวจเช็คกับต้นฉบับก่อนนำไปใช้ต่อ ๒.
				ผู้ชนะในแต่ละกลุ่มยังไม่ใช่สว. ที่กกต. รับรองอย่างเป็นทางการ
			</p>
		</div>
		<Button class="z-50 bg-white text-[#2B815F] shadow-lg" onclick={onstart}>เริ่มเล่น</Button>
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
