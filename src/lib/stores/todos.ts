import { writable } from 'svelte/store';

export interface Todo {
	id: string;
	name: string;
	done: boolean;
}

// List id -> Todo[]
export type TodosMap = Map<string, Todo[]>;

const todoStore = () => {
	const { subscribe, set, update } = writable<TodosMap>(new Map<string, Todo[]>());

	return {
		subscribe,
		init: (listId: string) => update((todos) => todos.set(listId, [])),
		add: (listId: string, name: string) =>
			update((todos) => {
				const newTodo: Todo = { id: crypto.randomUUID(), name, done: false };
				const newTodosList = [...(todos.get(listId) || []), newTodo];
				todos.set(listId, newTodosList);
				return todos;
			}),
		delete: (listId: string, id: string) =>
			update((todos) => {
				const todoList = todos.get(listId) || [];
				const newTodosList = todoList.filter((tl) => tl.id !== id);
				todos.set(listId, newTodosList);
				return todos;
			}),
		deleteEntry: (listId: string) =>
			update((todos) => {
				todos.delete(listId);
				return todos;
			})
	};
};

export const todos = todoStore();
