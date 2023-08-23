<script lang="ts">
	import CreateTodoModal from "$lib/components/CreateTodoModal.svelte";
	import TodoItem from "$lib/components/TodoItem.svelte";
	import { lists } from "$lib/stores/lists";
    import { todos } from "$lib/stores/todos";
	import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import { ArrowLeftFromLine } from 'lucide-svelte';

    export let data;
    $: list = $lists.find((l) => l.id === data.listId);
    
    const modal: ModalSettings = {
        type: 'component',
        component: { ref: CreateTodoModal, props: { listId: data.listId } },
    };
</script>

<a href="/" class="flex gap-2 mb-5">
    <ArrowLeftFromLine class="w-6 h-6  cursor-pointer" />
    <span>Back</span>
</a>

<h2 class="text-2xl font-semibold">{list?.name}</h2>

<div class="mt-4">
    <button 
        class="btn variant-filled-primary"
        on:click={() => modalStore.trigger(modal)}
    >
        + Add
    </button>
    <ul class="mt-6 space-y-3">
        {#each $todos.get(data.listId) ?? [] as todo (todo.id)}
            <TodoItem listId={data.listId} {todo} />
        {/each}
    </ul>
</div>
