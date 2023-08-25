<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { Pencil } from 'lucide-svelte';
	import EditTodoForm from './EditTodoForm.svelte';
	import type { Todo } from '$lib/stores/todos';

	export let todo: Todo;

	// To avoid cluttering the DOM with hidden edit forms
	let renderForm = false;
	// Unique ids to differentiate between popups
	const popupId = `edit-todo-popup-${todo.id}`;

	const popupSettings: PopupSettings = {
		target: popupId,
		event: 'click',
		placement: 'bottom-end',
		state: ({ state }) => (renderForm = state),
		closeQuery: '#close-popup'
	};
</script>

<!-- Trigger -->
<button
	type="button"
	class="btn variant-ghost-secondary px-1.5 rounded-md"
	use:popup={popupSettings}
>
	<Pencil class="w-4 h-4" />
</button>
<!-- Content -->
<div
	class={renderForm ? 'p-4 rounded-lg w-96 bg-surface-200 dark:bg-surface-500 shadow-md' : null}
	data-popup={popupId}
>
	{#if renderForm}
		<EditTodoForm {todo} />
	{/if}
</div>
