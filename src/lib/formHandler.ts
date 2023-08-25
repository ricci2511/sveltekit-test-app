import { onDestroy } from 'svelte';
import { writable, type Unsubscriber } from 'svelte/store';
import { z, ZodObject, ZodError, type ZodRawShape } from 'zod';

export type FormErrors<T> = Record<keyof T, string>;

/**
 * Creates a form handler based on a zod schema.
 * Might turn this into a tiny portable library? 🤔
 * @param schema zod schema to validate the form data against.
 * @param initialValues initial values for the form data (type is inferred from schema).
 * @returns form data and form errors store, submit handler which takes a callback that only runs if the form is valid.
 */
export function formHandler<T extends ZodObject<ZodRawShape>>(
	schema: T,
	initialValues?: z.infer<T>
) {
	type SchemaData = z.infer<T>;

	const formData = writable<SchemaData>(initialValues || ({} as SchemaData));
	const formErrors = writable<FormErrors<SchemaData>>({} as FormErrors<SchemaData>);
	let valid = false;
	let autoValidateSubscribtion: Unsubscriber | null = null;

	const validateForm = (formData: SchemaData): boolean => {
		try {
			schema.parse(formData);
			// Reset on succesful schema validation
			formErrors.set({} as FormErrors<SchemaData>);
			return true;
		} catch (err) {
			if (err instanceof ZodError) {
				const errors = err.errors.reduce(
					(acc, currErr) => ({
						...acc,
						[currErr.path[0]]: currErr.message
					}),
					{} as FormErrors<SchemaData>
				);
				formErrors.set(errors);
			}
			return false;
		}
	};

	const handleSubmit = (onSubmit: (formData: SchemaData) => void) => () => {
		// Validate and immediately unsubscribe to prevent calling onSubmit as soon as the form is valid
		formData.subscribe((fd) => {
			valid = validateForm(fd);
			if (valid) onSubmit(fd);
		})();
		// After unsuccessful validation, subscribe to formData changes, validating on the fly
		if (!valid && !autoValidateSubscribtion) {
			autoValidateSubscribtion = formData.subscribe((fd) => (valid = validateForm(fd)));
		}
	};

	// Cleanup possible existing autoValidateSubscribtion
	onDestroy(() => autoValidateSubscribtion?.());

	return {
		formData,
		formErrors,
		handleSubmit
	};
}
