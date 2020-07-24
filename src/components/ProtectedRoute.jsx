import React from "react";
import { Route, Redirect } from "react-router-dom";
<<<<<<< HEAD

class ProtectedRoute extends React.Component {
=======
import { SubscriptionsContext } from "../context/subscriptions-context";

class ProtectedRoute extends React.Component {
  static contextType = SubscriptionsContext;

>>>>>>> 6fe0d90e19e070ebaacb31fed9c1468e030b3427
  state = {
    auth: false,
    loading: true,
  };
<<<<<<< HEAD
  
  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3000/status", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status >= 400) {
        throw(new Error("not authorized"))
      } else { 
        const { jwt } = await response.json()
        localStorage.setItem('token', jwt)     
        this.setState({
          auth: true,
          loading: false,
        });
      }
    } catch(err) {
      console.log(err.message)
      this.setState({
        loading: false,
      });
=======

  getSubscriptions = async () => {
    return await fetch(`${process.env.REACT_APP_BACKEND_URL}/subscriptions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  checkStatusCode = (response) => {
    if (response.status >= 400) {
      throw new Error("not authorized");
    }
  };

  setTokenAndDispatch = async (response) => {
    const { jwt, subscriptions, current_user: currentUser } = await response.json();
    localStorage.setItem("token", jwt);
    sessionStorage.setItem("auth", true);
    this.context.dispatch("populate", { subscriptions, currentUser });
  };

  setAuth = () => this.setState({ auth: true, loading: false });

  setLoading = () => this.setState({ loading: false });

  async componentDidMount() {
    try {
      const response = await this.getSubscriptions();
      this.checkStatusCode(response);
      await this.setTokenAndDispatch(response);
      this.setAuth();
    } catch (err) {
      this.setLoading();
>>>>>>> 6fe0d90e19e070ebaacb31fed9c1468e030b3427
    }
  }

  render() {
    const { loading, auth } = this.state;
    // debugger
    if (!loading && !auth) {
      return <Redirect to="/" />;
    } else {
      return !loading && (
        <Route
          exact={this.props.exact}
          path={this.props.path}
          component={this.props.component}
        />
      );
    }
  }
}

export default ProtectedRoute;