<script lang="ts">
	import type { Priority } from '$lib/stores/lists';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { BadgeAlert } from 'lucide-svelte';

	export let priority: Priority;
	export let id: string; // Unique id to differentiate between multiple popups

	const popupSettings: PopupSettings = {
		target: id,
		event: 'hover',
		placement: 'top',
		middleware: { offset: 24 }
	};

	const prioColors: Record<Priority, string> = {
		low: 'variant-filled-secondary',
		medium: 'variant-filled-warning',
		high: 'variant-filled-error'
	};

	const color = prioColors[priority];
	const text = priority.charAt(0).toUpperCase() + priority.slice(1) + ' priority';
</script>

<!-- Trigger -->
<div class="[&>*]:pointer-events-none" use:popup={popupSettings}>
	<BadgeAlert class="w-5 h-5" />
</div>
<!-- Content  -->
<div class={`card px-2 py-1.5 w-32 ${color}`} data-popup={id}>
	<p class="text-sm text-center font-semibold">{text}</p>
	<div class={`arrow ${color}`} />
</div>
