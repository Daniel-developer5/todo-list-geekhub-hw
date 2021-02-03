import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { store } from '..'

export const ALL = 'ALL'
export const ACTIVE = 'ACTIVE'
export const COMPLETED = 'COMPLETED'

export const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: JSON.parse(window.localStorage.getItem('todos')) || [{ 
            text: 'Learn Redux', 
            id: uuidv4(), 
            completed: false,
        }],
        filterBy: ALL,
    },
    reducers: {
        addTodo: {
            reducer: ({ todos }, { payload }) => { 
                todos.push(payload)
                saveTodos(todos)
            },
            prepare: text => ({
                payload: {
                    text, id: uuidv4(), 
                    completed: false,
                },
            }),
        },
        markAsComplete: {
            reducer: ({ todos }, { payload }) => {
                const index = getById(todos, payload)
                todos[index].completed = !todos[index].completed

                saveTodos(todos)
            },
        },
        removeTodo: {
            reducer: ({ todos }, { payload }) => {
                const index = getById(todos, payload)
                todos.splice(index, 1)

                saveTodos(todos)
            }
        },
        startEditing: {
            reducer: ({ todos }, { payload }) => {
                const index = getById(todos, payload)
                todos[index].editing = true
                todos[index].newText = todos[index].text

                todosSlice.current = payload
                document.addEventListener('click', documentClick)
            },
        },
        editTodo: {
            reducer: ({ todos }, { payload }) => {
                const index = getById(todos, payload.id)
                todos[index].newText = payload.text
            },
        },
        endEditing: {
            reducer: ({ todos }, { payload }) => {
                const index = getById(todos, payload)
                todos[index].text = todos[index].newText || todos[index].text

                delete todos[index].editing
                delete todos[index].newText
                delete todosSlice.current

                document.removeEventListener('click', documentClick)
                saveTodos(todos)
            },
        },
        todosAll: state => { state.filterBy = ALL },
        todosActive: state => { state.filterBy = ACTIVE },
        todosCompleted: state => { state.filterBy = COMPLETED },
        clearCompleted: state => {
            state.todos = state.todos.filter(({ completed }) => !completed)
            saveTodos(state.todos)
        },
        toggleAll: state => {
            state.todos = state.todos.map(({ completed, ...todo }) => ({
                completed: state.todos.every(({ completed }) => completed) ? false : true, 
                ...todo
            }))

            saveTodos(state.todos)
        },
    },
})

export const { 
    addTodo, markAsComplete, 
    removeTodo, editTodo, startEditing,
    endEditing, todosAll,
    todosActive, todosCompleted, clearCompleted,
    toggleAll,
} = todosSlice.actions

const getById = (arr, argId) => arr.findIndex(({ id }) => id === argId)

const documentClick = e => {
    if (e.target.className !== 'edit') {
        store.dispatch(endEditing(todosSlice.current))
    }
}

const saveTodos = todos => {
    window.localStorage.setItem('todos', JSON.stringify(todos))
}