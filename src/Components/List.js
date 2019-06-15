import React from 'react';

const List = props => {
    console.log('Rendering the list...')

    return (
        <ul>
            {props.items.map(todo => (<li onClick={props.listRemove.bind(this, todo.id)} key={todo.id}>{todo.name}</li>))}
        </ul>
    )
}

export default List;