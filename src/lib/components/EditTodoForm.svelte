<script lang="ts">
	import { todos, type TodoFormData, type Todo } from '$lib/stores/todos';
	import { getContext } from 'svelte';
	import TodoForm from './TodoForm.svelte';

	export let todo: Todo;

	const listId = getContext<string>('listId');
	const formId = `edit-todo-form-${todo.id}`;

	// onSubmit is called from TodoForm within a formHandler.handleSubmit, so it
	// will only run if the form is valid.
	const onSubmit = (formData: TodoFormData) => {
		const { name, deadline } = formData;
		todos.update(listId, { id: todo.id, name, deadline });
		document.getElementById('close-popup')?.click(); // Trigger popup close
	};
</script>

<header class="text-xl font-semibold">Edit todo</header>
<TodoForm id={formId} action="?/update" submitCb={onSubmit} initialData={todo} />
<footer class="flex justify-end space-x-1 mt-4">
	<button id="close-popup" class="btn variant-outline-tertiary" type="button"> Cancel </button>
	<button class="btn variant-filled-primary" type="submit" form={formId}> Save </button>
</footer>
