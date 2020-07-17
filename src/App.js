import React from 'react';
// import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './shared/NavBar'
import { Route, Switch } from "react-router-dom";
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import NoMatch from './components/NoMatch'

class App extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route component={NoMatch} />
        </Switch>
      </>
    );
  }
}

export default App;
