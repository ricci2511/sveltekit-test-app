<script>
    import ListsTable from "$lib/components/ListsTable.svelte";
    import { lists } from "$lib/stores/lists";

    let addingList = false;
    let listInput = '';

    const createList = () => {
        lists.add(listInput);
        listInput = '';
        addingList = false;
    }
</script>

<h2 class="text-2xl font-semibold">Lists</h2>
<div class="mt-4">
    <button 
        class="bg-purple-500 hover:bg-purple-700 text-white font-light py-2 px-4 rounded"
        on:click={() => addingList = !addingList}
    >
        + Add
    </button>
    {#if addingList}
        <form class="mt-4" on:submit|preventDefault={() => addingList = false}>
            <input bind:value={listInput} type="text" name="name" placeholder="List name" class="border border-gray-300 rounded px-2 py-1" />
            <button 
                type="submit"
                class="bg-purple-500 hover:bg-purple-700 text-white text-sm font-medium py-2 px-3 rounded"
                on:click={createList}
            >
                Create
            </button>
        </form>
    {/if}

    <!-- TODO: display lists here -->
</div>
