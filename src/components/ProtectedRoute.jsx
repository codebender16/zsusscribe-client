import React from "react";
import { Route, Redirect } from "react-router-dom";
import { SubscriptionsContext } from "../context/subscriptions-context";

class ProtectedRoute extends React.Component {
  static contextType = SubscriptionsContext;

  state = {
    auth: false,
    loading: true,
  };

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