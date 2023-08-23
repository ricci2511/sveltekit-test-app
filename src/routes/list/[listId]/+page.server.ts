import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { TodoFormData } from '$lib/stores/todos';

export const load: PageServerLoad = ({ params }) => {
	return { listId: params.listId };
};

export const actions: Actions = {
	create: async ({ params, request }) => {
		const data = Object.fromEntries(await request.formData()) as unknown as TodoFormData;
		console.log('server form data', data);
	}
};
