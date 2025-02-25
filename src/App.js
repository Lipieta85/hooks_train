import React, { useState } from 'react';

import Todo from './Components/Todo';
import Header from './Components/Header';
import Auth from './Components/Auth';
import AuthContext from './auth-context';

const app = props => {
  const [page, setPage] = useState('auth')
  const [authStatus, setAuthStatus] = useState(false)

  const switchPage = pageName => {
    setPage(pageName)
  }

  const login = () => {
    setAuthStatus(true)
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{status: authStatus, login: login}}>
        <Header onLoadTodos={switchPage.bind(this, 'todo')}
                onLoadAuth={switchPage.bind(this, 'auth')} />
        <hr />
        {page === 'auth' ? <Auth /> : <Todo />}
      </AuthContext.Provider>
    </div>
  );
}

export default app;
