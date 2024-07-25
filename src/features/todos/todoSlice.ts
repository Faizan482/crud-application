
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface updateTodoInterface {
    id: string,
    title: string;
    description: string;
}
export interface Todo extends updateTodoInterface {
    completed: boolean;
    voiceNote: string;
}

export interface TodosState {
    todos: Todo[];
    searchTerm: string;
}

const initialState: TodosState = {
    todos: [],
    searchTerm: '',
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Omit<Todo, 'id'>>) => {
            state.todos.push({ id: Date.now().toString(), ...action.payload });
        },
        updateTodo: (state, action: PayloadAction<updateTodoInterface>) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = { ...state.todos[index], ...action.payload }
            }
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload);
        },
        toggleComplete: (state, action: PayloadAction<string>) => {
            const index = state.todos.findIndex((todo) => todo.id === action.payload);
            if (index !== -1) {
                state.todos[index].completed = !state.todos[index].completed;
            }
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { addTodo, updateTodo, deleteTodo, toggleComplete, setSearchTerm } = todoSlice.actions;
// for search query 
export const selectFilteredTodos = (state: RootState) => {
    const { todos, searchTerm } = state.todos;
    return todos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
};
export default todoSlice.reducer;
