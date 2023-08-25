<script lang="ts">
	import { todos, type Todo } from '$lib/stores/todos';
	import { Trash2 } from 'lucide-svelte';
	import EditTodoPopup from './EditTodoPopup.svelte';
	import { setContext } from 'svelte';

	export let listId: string;
	export let todo: Todo;
	$: ({ id, name, done } = todo);

	setContext('listId', listId);

	$: remove = () => todos.delete(listId, id);
	$: toggleDone = () => todos.update(listId, { id, done: !done });
</script>

<li class="flex items-center border-b border-b-secondary-300 py-1.5">
	<div class="flex items-center space-x-2 flex-1">
		<input class="checkbox" type="checkbox" checked={done} on:change={toggleDone} />
		<p>{name}</p>
	</div>
	<div>
		<EditTodoPopup {todo} />
		<button type="button" class="btn variant-ghost-error px-1.5 rounded-md" on:click={remove}>
			<Trash2 class="w-4 h-4" />
		</button>
	</div>
</li>
