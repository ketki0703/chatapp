import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import ChatUI from './Components/Chatapp/Chatapp';
import SignInPage from './Components/Register/Register';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={SignInPage} />
          <Route path="/login" exact component={Login} />

          <Route path="/chat" component={ChatUI} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
