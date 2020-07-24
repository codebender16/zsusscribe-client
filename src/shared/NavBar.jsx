import React from 'react'
import { SubscriptionsContext } from "../context/subscriptions-context";
import SignedInNavBar from './SignedInNavBar'
import SignedOutNavBar from './SignedOutNavBar'


class NavBar extends React.Component {

  static contextType = SubscriptionsContext

  render() {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        {sessionStorage.getItem("auth") ? (
          <SignedInNavBar history={this.props.history} context={this.context} />
        ) : (
          <SignedOutNavBar />
        )}
      </nav>
    )
  }
};

export default NavBar;