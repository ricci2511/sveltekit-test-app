<script>
	import { lists } from "$lib/stores/lists";
    import { todos } from "$lib/stores/todos";
    import { ArrowLeftFromLine } from 'lucide-svelte';

    export let data;
    
    $: list = $lists.find((l) => l.id === data.listId);
    $: todoItems = $todos.get(data.listId) ?? [];

    let addingTodo = false;
    let todoInput = '';

    const createTodo = () => {
        todos.add(data.listId, todoInput);
        addingTodo = false;
        todoInput = '';
    }
</script>

<a href="/" class="flex gap-2 mb-5">
    <ArrowLeftFromLine class="w-6 h-6  cursor-pointer" />
    <span>Back</span>
</a>

<h2 class="text-2xl font-semibold">{list?.name}</h2>

{#if addingTodo}
    <form class="mt-4" on:submit|preventDefault={() => addingTodo = false}>
        <input bind:value={todoInput} type="text" name="name" placeholder="Todo name" class="border border-gray-300 rounded px-2 py-1" />
        <button 
            type="submit"
            class="bg-purple-500 hover:bg-purple-700 text-white text-sm font-medium py-2 px-3 rounded"
            on:click={createTodo}
        >
            Create
        </button>
    </form>
{/if}

<div class="mt-4">
    <button 
        class="bg-purple-500 hover:bg-purple-700 text-white font-light py-2 px-4 rounded"
        on:click={() => addingTodo = !addingTodo}
    >
        + Add todo
    </button>
    <ul class="mt-3">
        {#each todoItems as todo}
            <li>{todo.name}</li>
        {/each}
    </ul>
</div>
