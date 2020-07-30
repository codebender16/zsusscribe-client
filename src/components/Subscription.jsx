import React from "react";
import { Link } from "react-router-dom";
// import moment from 'moment'
import { SubscriptionsContext } from "../context/subscriptions-context";
import NoSubscriptions from "./NoSubscriptions";

class Subscriptions extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  static contextType = SubscriptionsContext;
  state = { search: "", name: false, category: false };

  onInputChange = (event) => {
    this.setState({
      search: event.target.value,
      name: true,
      category: false,
    });
  };

  onSelectCategory = (event) => {
    this.textInput.current.value = "";
    this.setState({
      search: event.target.value,
      name: false,
      category: true,
    });
    // window.location.reload(false)
    // console.log(filteredSubscriptionsByCategory)
    // console.log(this.renderSubscriptions(filteredSubscriptionsByCategory))
  };

  getUniqueCategories = (subscriptions) => {
    let arr = [];
    subscriptions.map((subscription) => {
      return arr.push(subscription.category);
    });
    let categories = [...new Set(arr)];
    return categories;
  };

  renderCategories = (categories) => {
    return categories.map((category, index) => {
      return (
        <option key={index} value={category}>
          {category.toLowerCase()}
        </option>
      );
    });
  };

  deleteSubscription = async (id) => {
    const result = window.confirm("Do you really want to delete?");
    if (result) {
      this.context.dispatch("delete", id);
      fetch(`${process.env.REACT_APP_BACKEND_URL}/subscriptions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  };

  renderSubscriptions = (subscriptions) => {
    return subscriptions.map((subscription, index) => {
      return (
        <div key={index} className="flex flex-row">
          <div className="flex-none text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
            {subscription.name}
          </div>
          <div className="flex-none text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
            $: {subscription.payment_amount}
          </div>
          <div className="flex-none text-gray-700 text-center bg-gray-400 px-4 py-2 m-2">
            {subscription.payment_date}
          </div>
          <p>{subscription.category_name}</p>
          <div className="edit-delete-container inline-flex">
            <Link
              className="flex-none text-gray-700 text-center bg-blue-400 rounded px-4 py-2 m-2"
              type="button"
              to={`/subscriptions/${subscription.id}/edit`}
            >
              Edit
            </Link>
            <span
              className="flex-none text-gray-700 text-center bg-red-400 rounded px-4 py-2 m-2"
              type="button"
              onClick={() => this.deleteSubscription(subscription.id)}
            >
              Delete
            </span>
          </div>
        </div>
      );
    });
  };

  render() {
    const { subscriptions } = this.context;
    // console.log(subscriptions);
    // console.log(this.state.search)
    const categories = this.getUniqueCategories(subscriptions);
    const filteredSubscriptions = subscriptions.filter((subscription) => {
      if (this.state.name) {
        return subscription.name.toLowerCase().includes(this.state.search);
      } else {
        return subscription.category.toLowerCase().includes(this.state.search);
      }
    });

    return subscriptions.length === 0 ? (
      <NoSubscriptions />
    ) : (
      <>
        <label htmlFor="search-by-name">Search</label>
        <input
          type="text"
          name="search-bar"
          id="search"
          onChange={this.onInputChange}
          ref={this.textInput}
        />
        <select className="inline-flex justify-end rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150" onChange={this.onSelectCategory}>
          <option value="">Category</option>
          {this.renderCategories(categories)}
        </select>
        {this.renderSubscriptions(filteredSubscriptions)}
      </>
    );
  }
}

export default Subscriptions;
