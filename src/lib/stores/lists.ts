import { writable } from 'svelte/store';
import { todos } from './todos';

export type Priority = 'low' | 'medium' | 'high';

export interface List {
	id: string;
	name: string;
	priority: Priority;
}

const listStore = () => {
	const { subscribe, set, update } = writable<List[]>([]);

	return {
		subscribe,
		add: (name: string, priority: Priority) =>
			update((lists) => {
				const newList: List = { id: crypto.randomUUID(), name, priority };
				todos.init(newList.id); // Initialize todos array for the new list
				return [...lists, newList];
			}),
		delete: (id: string) =>
			update((lists) => {
				todos.deleteEntry(id); // Delete list map entry from todos store
				return lists.filter((l) => l.id !== id);
			}),
		update: (id: string, list: List) =>
			update((lists) => lists.map((l) => (l.id === id ? list : l)))
	};
};

export const lists = listStore();
