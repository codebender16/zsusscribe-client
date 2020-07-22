import React from "react";
import { Route, Redirect } from "react-router-dom";
import { SubscriptionsContext } from '../context/subscriptions-context'

class ProtectedRoute extends React.Component {
  static contextType = SubscriptionsContext
  state = {
    auth: false,
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/subscriptions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status >= 400) {
        throw(new Error("not authorized"))
      } else { 
        const { jwt, bookmarks } = await response.json()        
        localStorage.setItem('token', jwt)
        this.context.dispatch("populate", bookmarks)
        this.setState({
          auth: true,
          loading: false,
        });
      }
    } catch(err) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { loading, auth } = this.state;
    if (!loading && !auth) {
      return <Redirect to="/login" />;
    } else {
      return (
        !loading && (
          <Route
            exact={this.props.exact}
            path={this.props.path}
            component={this.props.component}
          />
        )
      );
    }
  }
}

export default ProtectedRoute;