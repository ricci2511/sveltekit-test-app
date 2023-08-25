<script lang="ts">
	import CreateListModal from '$lib/components/CreateListModal.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { lists } from '$lib/stores/lists';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Database, DatabaseBackup, Plus } from 'lucide-svelte';

	const modal: ModalSettings = {
		type: 'component',
		component: { ref: CreateListModal }
	};
</script>

<h2 class="text-2xl font-semibold">Lists</h2>
<div class="mt-4">
	<div class="flex justify-between">
		<button class="btn variant-filled-primary" on:click={() => modalStore.trigger(modal)}>
			<span>Add</span>
			<Plus class="w-4 h-4 ml-2" />
		</button>
		<div class="flex space-x-2">
			<button class="btn variant-filled-secondary ml-2">
				<span>Backup</span>
				<Database class="w-4 h-4 ml-2" />
			</button>
			<button class="btn variant-filled-secondary ml-2">
				<span>Restore</span>
				<DatabaseBackup class="w-4 h-4 ml-2" />
			</button>
		</div>
	</div>
	<div
		class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-x-4 gap-y-8"
	>
		{#each $lists as list (list.id)}
			<ListCard {list} />
		{/each}
	</div>
</div>
