import React, { useEffect, useReducer } from 'react';

import axios from 'axios';

import List from './List';

import { useFormInput } from '../hooks/forms';

const todo = props => {
    //const [inputIsValid, setInputIsValid] = useState(false)
    //const [todoName, setTodoName] = useState('');
    //const [todoList, setTodoList] = useState([]);
    //const [submittedTodo, setSubmittedTodo] = useState(null);

    //const todoInputRef = useRef();
    const todoInput = useFormInput();

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter((todo) => todo.id !== action.payload);
            default:
                return state;
        }
    }

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(() => {
        axios.get('https://addusers-71af4.firebaseio.com/todo.json')
            .then((result) => {
                console.log(result);
                const todoData = result.data;
                const todos = [];
                for (const key in todoData) {
                    todos.push({ id: key, name: todoData[key].name })
                }
                dispatch({ type: 'SET', payload: todos })
            })
    }, [])

    /*useEffect(() => {
        if (submittedTodo) {
            dispatch({type: 'ADD', payload: submittedTodo});
        }
    }, [submittedTodo])
    */
    //const inputChangeHandler = event => {
    //    setTodoName(event.target.value)
    //}

    const toAddChangeHandler = () => {

        const todoName = todoInput.value;

        axios.post('https://addusers-71af4.firebaseio.com/todo.json', { name: todoName })
            .then(res => {
                console.log(res)
                const todoItem = { id: res.data.name, name: todoName }
                dispatch({ type: 'ADD', payload: todoItem });
                console.log(todoList);
            })
            .catch(err => {
                console.log(err)
            });
    }

    const todoRemoveHandler = (todoId) => {
        axios.delete(`https://addusers-71af4.firebaseio.com/todo/${todoId}.json`)
            .then(res => {
                console.log(res);
                dispatch({ type: 'REMOVE', payload: todoId })
            })
            .catch((err) => {
                console.log(err)
            });
    }

    return (
        <div>
            <input
                type="text"
                onChange={todoInput.onChange}
                value={todoInput.value}
                style={{backgroundColor: todoInput.validity ? 'transparent' : 'red'}}
            />
            <button type="button" onClick={toAddChangeHandler}>Add</button>
            <List listRemove={todoRemoveHandler} items={todoList}/>
        </div>
    );
};

export default todo;