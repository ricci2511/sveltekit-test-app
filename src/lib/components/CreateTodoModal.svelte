<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import Modal from './ui/Modal.svelte';
	import TodoForm from './TodoForm.svelte';
	import { todos, type TodoFormData } from '$lib/stores/todos';

	export let listId: string;

	const onSubmit = (formData: TodoFormData) => {
		const { name, deadline } = formData;
		todos.add(listId, name, deadline);
		modalStore.close();
	};
</script>

<!-- TODO: Add validation -->
<Modal>
	<svelte:fragment slot="header">Create todo</svelte:fragment>
	<svelte:fragment slot="main">
		<TodoForm id="createTodoForm" action="?/create" submitCb={onSubmit} />
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<button class="btn variant-filled-primary" type="submit" form="createTodoForm"> Create </button>
		<button on:click={() => modalStore.close()} class="btn variant-outline-surface" type="button">
			Cancel
		</button>
	</svelte:fragment>
</Modal>
