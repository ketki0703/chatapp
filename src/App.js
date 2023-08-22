import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import ChatUI from './Components/Chatapp/Chatapp';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/chat" component={ChatUI} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
