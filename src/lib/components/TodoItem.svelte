<script lang="ts">
	import { todos, type Todo, type TodoFormData } from '$lib/stores/todos';
	import { Trash2 } from 'lucide-svelte';
	import EditTodoPopup from './EditTodoPopup.svelte';
	import TodoForm from './TodoForm.svelte';

	export let listId: string;
	export let todo: Todo;
	$: ({ id, name, deadline, done } = todo);

	$: remove = () => todos.delete(listId, id);
	$: toggleDone = () => todos.update(listId, { id, done: !done });

	const onSubmit = (formData: TodoFormData) => {
		const { name, deadline } = formData;
		todos.update(listId, { id, name, deadline });
	};
</script>

<li class="flex items-center border-b border-b-secondary-300 py-1.5">
	<div class="flex items-center space-x-2 flex-1">
		<input class="checkbox" type="checkbox" checked={done} on:change={toggleDone} />
		<p>{name}</p>
	</div>
	<div>
		<EditTodoPopup id={`edit-todo-${id}`}>
			<TodoForm
				id={`edit-todo-form-${id}`}
				action="?/update"
				submitCb={onSubmit}
				initialData={todo}
			/>
			<div class="flex justify-end space-x-1 mt-4">
				<button class="btn variant-outline-tertiary" type="button"> Cancel </button>
				<button class="btn variant-filled-primary" type="submit" form={`edit-todo-form-${id}`}>
					Save
				</button>
			</div>
		</EditTodoPopup>
		<button type="button" class="btn variant-ghost-error px-1.5 rounded-md" on:click={remove}>
			<Trash2 class="w-4 h-4" />
		</button>
	</div>
</li>
