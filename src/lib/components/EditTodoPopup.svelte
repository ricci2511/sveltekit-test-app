<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Pencil } from 'lucide-svelte';

	export let id: string; // Unique id to differentiate between multiple popups

	const popupSettings: PopupSettings = {
		target: id,
		event: 'click',
		placement: 'bottom-end'
	};
</script>

<!-- Trigger -->
<button
	type="button"
	class="btn variant-ghost-secondary px-1.5 rounded-md"
	use:popup={popupSettings}
>
	<Pencil class="w-4 h-4" />
</button>
<!-- Content -->
<div class="p-4 rounded-lg w-96 bg-surface-200 dark:bg-surface-500 shadow-md" data-popup={id}>
	<header class="text-xl font-semibold">Edit todo</header>
	<slot />
	<div class="arrow bg-surface-200 dark:bg-surface-500" />
</div>
