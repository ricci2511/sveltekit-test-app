<script lang="ts">
	import { lists } from '$lib/stores/lists';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Modal from './ui/Modal.svelte';
	import { formHandler } from '$lib/formHandler';
	import { z } from 'zod';
	import FormInput from './ui/FormInput.svelte';

	const schema = z.object({
		name: z
			.string()
			.min(1, 'Name must be at least 1 character long.')
			.max(100, 'Name must be at most 100 characters long.')
			.default(''),
		priority: z.enum(['low', 'medium', 'high']).default('medium')
	});

	const { formData, formErrors, handleSubmit } = formHandler(schema);

	const onSubmit = handleSubmit(({ name, priority }) => {
		lists.add(name, priority);
		modalStore.close();
	});
</script>

<Modal>
	<svelte:fragment slot="header">Create list</svelte:fragment>
	<svelte:fragment slot="main">
		<form class="mt-4 space-y-4" id="createListForm" on:submit|preventDefault={onSubmit}>
			<FormInput
				bind:value={$formData.name}
				label="Name"
				error={$formErrors.name}
				type="text"
				id="list-name"
				name="name"
				placeholder="List name"
			/>
			<label class="label">
				<span>Priority</span>
				<select class="select" bind:value={$formData.priority}>
					<option value="low">Low</option>
					<option value="medium">Medium</option>
					<option value="high">High</option>
				</select>
			</label>
			<div class="space-x-1 ml-auto flex w-full justify-end" />
		</form>
	</svelte:fragment>
	<svelte:fragment slot="footer">
		<button class="btn variant-filled-primary" type="submit" form="createListForm"> Create </button>
		<button on:click={() => modalStore.close()} class="btn variant-outline-surface" type="button">
			Cancel
		</button>
	</svelte:fragment>
</Modal>
