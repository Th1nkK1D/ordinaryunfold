<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Logo from '../../../components/logo.svelte';
	import Button from './button.svelte';

	const dispatch = createEventDispatcher();
</script>

<div
	class="absolute inset-x-3 inset-y-24 z-10 flex flex-col items-center gap-10 text-white md:gap-12"
>
	<Logo />
	<div class="flex flex-col gap-3 text-center md:gap-6">
		<h1 class="font-chonburi text-7xl">Senates Blind Test</h1>
		<p class="font-charmonman text-3xl">
			เกมทายใจ ใครเป็นผู้ชนะการเลือกตั้งสว. จากเอกสารแนะนำตัว ๕ บรรทัด
		</p>
	</div>
	<div class="flex max-w-screen-md flex-col gap-2 indent-8">
		<p>
			ในการเลือกตั้งสว. รอบสุดท้ายของปี 2567 จากผู้สมัครทั้งหมด 800 คน
			ผู้ที่ได้คะแนนโหวตจากสว.ด้วยกันเองสูงสุด 10 คนในแต่ละกลุ่มอาชีพ 20 กลุ่ม (รวมเป็น 200 คน)
			จะได้รับการแต่งตั้งเป็นสว.
		</p>
		<p>
			เกม “สว. Blind Audition” จะสุ่ม “ประวัติการทํางานหรือประสบการณ์ในการทํางานในกลุ่มที่สมัคร
			(ไม่เกิน ๕ บรรทัด)” จากใบสมัครของ สว. 4 คนในกลุ่มนั้นๆ มีเพียงคนเดียวเท่านั้นที่ได้เป็นสว.
			ผู้เล่นต้องทายว่าคนที่ได้รับเลือกเป็นสว. คนนั้นคือใคร?
		</p>
		<a
			href="https://senates67.com"
			target="_blank"
			rel="noopener noreferrer"
			class="self-end text-sm underline opacity-60">อ่านเพิ่มเติมเกี่ยวกับระบบการเลือกตั้งสว.</a
		>
	</div>
	<Button
		class="border-white text-white hover:bg-white hover:text-[#2B815F]"
		on:click={() => dispatch('start')}>เริ่มเล่น</Button
	>
	<button></button>
</div>
