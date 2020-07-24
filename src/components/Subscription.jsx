import React from "react";
import { Link } from "react-router-dom";
// import moment from "moment";
import { SubscriptionsContext } from "../context/subscriptions-context";
import NoSubscriptions from "./NoSubscriptions";

class Subscriptions extends React.Component {
  static contextType = SubscriptionsContext;
  state = { search: "", category: ""};

  onInputChange = (event) => {
    this.setState({
      search: event.target.value,
      category: ""
    })
  }

  onSelectCategory = (event) => {
    this.setState({
      search: "",
      category: event.target.value
    })
  }

  deleteSubscription = async (id) => {
    this.context.dispatch("delete", id);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/subscriptions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  renderSubscriptions = (subscriptions) => {
    return subscriptions.map((subscription, index) => {
      return (
        <div key={index}>
          <h3>{subscription.name}</h3>
          <p>{subscription.payment_amount}</p>
          <div>
            <Link to={`/subscriptions/${subscription.id}/edit`}>Edit</Link>
            <span onClick={() => this.deleteSubscription(subscription.id)}>Delete</span>
          </div>
          <hr />
        </div>
      );
    });
  };

  render() {
    const { subscriptions } = this.context;
    console.log(subscriptions)
    const filteredSubscriptionsByName = subscriptions.filter(subscription => {
      return subscription.name.toLowerCase().includes(this.state.search)
    })
    // const filteredSubscriptionsByCategory = subscriptions.filter(subscription => {
    //   return subscription.category_id.name.toLowerCase().includes
    // })
    return (
      subscriptions.length === 0 ? (
      <NoSubscriptions />
    ) : (
      <>
        <label htmlFor="search-by-name">Search</label>
        <input 
          type="text" 
          name="search-bar"
          id='search'
          onChange={this.onInputChange}
        />
        <label htmlFor="filter-by-category">Filter By:</label>
        <select onChange={this.onSelectCategory}>
          <option value="category">Category</option>
          <option value="entertainment">entertainment</option>
          <option value="games">games</option>
        </select>
        {this.renderSubscriptions(filteredSubscriptionsByName)}
      </>
    )
    )}
    
}

export default Subscriptions;