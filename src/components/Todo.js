import React, { useState, useEffect } from 'react';

import axios from 'axios';

const todo = props => {
    const [todoName, setTodoName] = useState('')
    const [todoList, setTodoList] = useState([])

    useEffect(() => {
        axios.get('https://addusers-71af4.firebaseio.com/todo.json')
            .then((result) => {
                console.log(result);
                const todoData = result.data;
                const todos = [];
                for (const key in todoData) {
                    todos.push({ id: key, name: todoData[key].name })
                }
                setTodoList(todos)
            })
    }, [])

    const inputChangeHandler = event => {
        setTodoName(event.target.value)
    }

    const toAddChangeHandler = () => {
        axios.post('https://addusers-71af4.firebaseio.com/todo.json', { name: todoName })
            .then(res => {
                console.log(res)
                setTodoList(todoList.concat({name: todoName}))
                console.log(todoList)
            })
            .catch(err => {
                console.log(err)
            });
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Todo"
                onChange={inputChangeHandler}
                value={todoName}
            />
            <button type="button" onClick={toAddChangeHandler}>Add</button>
            <ul>
                {todoList.map(todo => (<li key={todo.id}>{todo.name}</li>))}
            </ul>
        </div>
    );
};

export default todo;