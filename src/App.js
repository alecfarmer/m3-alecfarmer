import React, { useState, useRef, useEffect } from 'react'
import TodoList from './components/TodoList'
const {"v4": uuidv4} = require('uuid');

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([]) // Object destructing
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) 
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function AddTodo (e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
        })
        todoNameRef.current.value = null
    }

    function clearTodos() {
        const newTodos = todos.filter(todos => !todos.complete)
        setTodos(newTodos)
    }

    return (
        <>
            <div>
                <TodoList todos={todos} toggleTodo={toggleTodo} />
            </div>
            <div>
                <input ref={todoNameRef} type="text" />
                <div>{todos.filter(todo => !todo.complete).length} left to do</div>
            </div>
            <div style={{backgroundColor: 'lightgray'}}>
                <button onClick={AddTodo}>Add Todo</button>
                <button onClick={clearTodos}> Clear Completed</button>
            </div>
        </>
    )
}

export default App;