<script lang="ts">
	import { lists, type List } from "$lib/stores/lists";
	import { modalStore } from "@skeletonlabs/skeleton";
	import Modal from "./ui/Modal.svelte";

    const formData: Omit<List, 'id'> = {
        name: '',
        priority: 'medium',
    };

    const createList = () => {
        const { name, priority } = formData;
        lists.add(name, priority)
        modalStore.close();
    }
</script>

<!-- TODO: Add validation -->
<Modal>
    <svelte:fragment slot="header">
        Create list
    </svelte:fragment>
    <svelte:fragment slot="main">
        <form class="mt-4 space-y-4" id="createListForm">
            <label class="label" for="list-name">
                <span>Name</span>
                <input bind:value={formData.name} class="input p-2" type="text" name="name" id="list-name" placeholder="List name" />
            </label>
            <label class="label">
                <span>Priority</span>
                <select class="select" bind:value={formData.priority}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </label>
            <div class="space-x-1 ml-auto flex w-full justify-end">

            </div>
        </form>
    </svelte:fragment>
    <svelte:fragment slot="footer">
        <button 
            on:click={createList}
            class="btn variant-filled-primary"
            type="submit"
            form="createListForm"
        >
            Create
        </button>
        <button
            on:click={() => modalStore.close()}
            class="btn variant-outline-surface"
            type="button"
        >
            Cancel
        </button>
    </svelte:fragment>        
</Modal>
