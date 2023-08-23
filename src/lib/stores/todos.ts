import { writable } from 'svelte/store';

export interface Todo {
	id: string;
	name: string;
	deadline: Date;
	done: boolean;
}

// List id -> Todo[]
export type TodosMap = Map<string, Todo[]>;
// Same as Todo but without id and done
export type TodoFormData = Omit<Todo, 'id' | 'done'>;
// Make all properties of Todo optional except id
export type TodoUpdate = Omit<Partial<Todo>, 'id'> & Pick<Todo, 'id'>;

const todoStore = () => {
	const { subscribe, set, update } = writable<TodosMap>(new Map<string, Todo[]>());

	return {
		subscribe,
		init: (listId: string) => update((todos) => todos.set(listId, [])),
		add: (listId: string, name: string, deadline: Date) =>
			update((todos) => {
				const newTodo: Todo = { id: crypto.randomUUID(), name, deadline, done: false };
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
			}),
		update: (listId: string, todo: TodoUpdate) =>
			update((todos) => {
				const todoList = todos.get(listId) || [];
				const newTodosList = todoList.map((tl) => (tl.id === todo.id ? { ...tl, ...todo } : tl));
				todos.set(listId, newTodosList);
				return todos;
			})
	};
};

export const todos = todoStore();
