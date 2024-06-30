<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Logo from '../../../components/logo.svelte';
	import Button from './button.svelte';

	const dispatch = createEventDispatcher();
</script>

<div
	class="absolute inset-x-3 inset-y-6 z-10 flex flex-col items-center gap-8 text-white md:inset-y-24 md:gap-12"
>
	<Logo />
	<div class="flex flex-col gap-4 text-center md:gap-6">
		<h1 class="font-chonburi text-5xl md:text-7xl">Senates Blind Test</h1>
		<p class="font-charmonman text-2xl md:text-3xl">
			เกมทายใจ ใครเป็นผู้ชนะการเลือกตั้งสว. จากเอกสารแนะนำตัว ๕ บรรทัด
		</p>
	</div>
	<div class="flex max-w-screen-md flex-col gap-2 indent-8">
		<p>
			จากผู้สมัครทั้งหมด 800 คน ในการเลือกตั้งสว. รอบสุดท้ายของปี 2567
			ผู้ที่ได้คะแนนโหวตจากสว.ด้วยกันเองสูงสุด 10 คนในแต่ละกลุ่มอาชีพ 20 กลุ่ม (รวมเป็น 200 คน)
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
			สว. 4 คน ผู้เล่นต้องทายว่าคนที่ได้รับเลือกเป็นสว. 1 ใน 4 คนนั้นคือใคร?
		</p>
	</div>
	<Button class="bg-white text-[#2B815F]" on:click={() => dispatch('start')}>เริ่มเล่น</Button>
</div>
