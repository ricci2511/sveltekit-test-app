<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Archive, MoreHorizontal, Trash2 } from 'lucide-svelte';

	export let id: string; // Unique id to differentiate between multiple dropdowns
	export let deleteList: () => void;

	const popupSettings: PopupSettings = {
		target: id,
		event: 'click',
		placement: 'bottom-end'
	};
</script>

<!-- Trigger -->
<button use:popup={popupSettings}>
	<MoreHorizontal class="w-5 h-5" />
</button>
<!-- Content  -->
<div class="card bg-surface-300 dark:bg-surface-600 px-2 rounded-md py-1.5 w-32" data-popup={id}>
	<div class="space-y-2">
		<button class="btn btn-sm rounded-md w-full variant-filled-error" on:click={deleteList}>
			<span>Delete</span>
			<Trash2 class="w-4 h-4 mr-2" />
		</button>
		<button class="btn btn-sm rounded-md w-full variant-filled-warning">
			<span>Archive</span>
			<Archive class="w-4 h-4 mr-2" />
		</button>
	</div>

	<div class="arrow bg-surface-300 dark:bg-surface-600" />
</div>
