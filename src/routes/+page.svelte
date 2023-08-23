<script lang="ts">
	import CreateListModal from '$lib/components/CreateListModal.svelte';
	import ListCard from '$lib/components/ListCard.svelte';
	import { lists } from '$lib/stores/lists';
	import { modalStore, type ModalSettings } from '@skeletonlabs/skeleton';

	const modal: ModalSettings = {
		type: 'component',
		component: { ref: CreateListModal }
	};
</script>

<h2 class="text-2xl font-semibold">Lists</h2>
<div class="mt-4">
	<button class="btn variant-filled-primary" on:click={() => modalStore.trigger(modal)}>
		+ Add
	</button>
	<div
		class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-x-4 gap-y-8"
	>
		{#each $lists as list (list.id)}
			<ListCard {list} />
		{/each}
	</div>
</div>
