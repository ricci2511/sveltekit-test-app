<script lang="ts">
    import type { List } from "$lib/stores/lists";
	import ListPriorityTooltip from "./ListPriorityTooltip.svelte";

    export let list: List;
    const { id, name, priority } = list;
</script>

<a href={`/list/${id}`} class="card p-4 relative hover:bg-surface-300 dark:hover:bg-surface-600">
    <ListPriorityTooltip id={`tooltip-${id}`} {priority}/>
    <header class="card-header">
        {name}
    </header>
</a>
