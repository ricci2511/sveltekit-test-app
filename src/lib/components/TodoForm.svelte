<script lang="ts">
	import type { TodoFormData } from "$lib/stores/todos";

    // Unique id to differentiate between create and edit forms
    export let id: string; 
    export let action: string;
    export let onSubmit: (formData: TodoFormData) => void;
    export let formData: TodoFormData = { name: "", deadline: new Date() };
</script>

<!-- Will be converted to a tauri app, therefore sveltekit form actions are not used -->
<form method="POST" class="mt-4 space-y-4" on:submit|preventDefault={() => onSubmit(formData)} {id} {action}>
    <label class="label" for="todo-name">
        <span>Name</span>
        <input bind:value={formData.name} class="input p-2" type="text" name="name" id="todo-name" placeholder="Todo name" />
    </label>
    <label class="label" for="todo-deadline">
        <span>Deadline</span>
        <input bind:value={formData.deadline} class="input p-2" type="date" name="deadline" id="todo-deadline" min={Date.now()} />
    </label>
</form>
