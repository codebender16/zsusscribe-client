import React from 'react';
import ProtectedRoute from './ProtectedRoute'
import NavBar from '../shared/NavBar'
import { Route, Switch } from "react-router-dom";
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import NoMatch from './NoMatch'
import CreateSubscription from "./CreateSubscription";
import EditSubscription from "./EditSubscription";
import Subscription from "./Subscription";
import { SubscriptionsContext, dispatch } from '../context/subscriptions-context'

class App extends React.Component {

  state = { subscriptions: [], dispatch: dispatch.bind(this) }
  
  render() {
    return (
      <>
      {console.log(this.state)}
        <SubscriptionsContext.Provider value={this.state}>
        <Route component={NavBar} />
        <div className="px-8 py-12 max-w-md mx-auto">
          <Switch>
            <ProtectedRoute exact path="/subscriptions/:id/edit" component={EditSubscription} />
            <ProtectedRoute exact path="/subscriptions/create" component={CreateSubscription} />
            <ProtectedRoute exact path="/subscriptions" component={Subscription} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        </SubscriptionsContext.Provider>
      </>
    );
  }
}

export default App;