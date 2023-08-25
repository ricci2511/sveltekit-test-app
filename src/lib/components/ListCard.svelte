<script lang="ts">
	import { lists, type List } from '$lib/stores/lists';
	import ListPriorityTooltip from './ListPriorityTooltip.svelte';
	import ListDropdown from './ListDropdown.svelte';

	export let list: List;
	const { id, name, priority } = list;

	$: deleteList = () => lists.delete(id);
</script>

<div class="card flex p-4 relative hover:bg-surface-300 dark:hover:bg-surface-600">
	<a href={`/list/${id}`} class="w-full">
		{name}
	</a>
	<div class="flex flex-col space-y-3">
		<ListPriorityTooltip id={`tooltip-${id}`} {priority} />
		<ListDropdown id={`dropdown-${id}`} {deleteList} />
	</div>
</div>
