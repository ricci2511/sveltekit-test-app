<script lang="ts">
	import { formHandler } from '$lib/formHandler';
	import { z } from 'zod';
	import FormInput from './ui/FormInput.svelte';

	const minDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000); // Tomorrow

	const schema = z.object({
		name: z
			.string()
			.min(1, 'Name must be at least 1 character long.')
			.max(100, 'Name must be at most 100 characters long.')
			.default(''),
		deadline: z.coerce
			.date()
			.min(new Date(Date.now()), 'Deadline must be in the future.')
			.default(minDeadline)
	});

	// Unique id to differentiate between create and edit forms
	export let id: string;
	export let action: string;
	export let submitCb: (formData: z.infer<typeof schema>) => void;
	export let initialData: z.infer<typeof schema> = { name: '', deadline: minDeadline };

	const { formData, formErrors, handleSubmit } = formHandler(schema, initialData);
	const onSubmit = handleSubmit((formData) => submitCb(formData));

	// For date inputs to work properly they require the date in ISO format,
	// so we store the ISO string separately and bind the date input to it.
	// Everytime it changes it will manually update the formData from formHandler.
	let deadlineVal = $formData.deadline.toISOString().split('T')[0];
	$: {
		formData.update((fd) => ({ ...fd, deadline: new Date(deadlineVal) }));
	}
</script>

<form method="POST" class="mt-4 space-y-4" on:submit|preventDefault={onSubmit} {id} {action}>
	<FormInput
		bind:value={$formData.name}
		label="Name"
		error={$formErrors.name}
		type="text"
		id="todo-name"
		name="name"
		placeholder="Todo name"
	/>
	<FormInput
		bind:value={deadlineVal}
		label="Deadline"
		error={$formErrors.deadline}
		type="date"
		id="todo-deadline"
		name="deadline"
		min={minDeadline.toISOString().split('T')[0]}
		on:input={() => console.log('dateinput')}
	/>
</form>
