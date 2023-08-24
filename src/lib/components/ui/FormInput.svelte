<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		value: HTMLInputAttributes['value'];
		label: string;
		error: string;
	}

	export let value: $$Props['value'];
	export let label: $$Props['label'];
	export let error: $$Props['error'];

	$: inputClass = cn('input', $$restProps.class, error && 'input-error');
</script>

<label class="label" for={$$restProps.id}>
	<span>{label}</span>
	<input {...$$restProps} bind:value aria-invalid={!!error} class={inputClass} />
	{#if error}
		<p class="text-error-400 text-sm mt-1 ml-1">{error}</p>
	{/if}
</label>
