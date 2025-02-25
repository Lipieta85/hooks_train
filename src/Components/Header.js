import React, { useContext } from 'react';

import AuthContext from '../auth-context';

const header = (props) => {
    const auth = useContext(AuthContext);

    return (
        <header>
            {auth.status === true ? <button onClick={props.onLoadTodos}>Todo List</button> : null}
            <button onClick={props.onLoadAuth}>Auth</button>
        </header>
    )
};

export default header;