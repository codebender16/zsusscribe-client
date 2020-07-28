import React from 'react'
import { Link } from "react-router-dom";
// import moment from 'moment'
import { SubscriptionsContext } from '../context/subscriptions-context'
import NoSubscriptions from "./NoSubscriptions";

class Subscriptions extends React.Component {
  constructor(props) {
    super(props) 
    this.textInput = React.createRef()
  }
  static contextType = SubscriptionsContext;
  state = { search: "", name: false, category: false};

  onInputChange = (event) => {
    this.setState({
      search: event.target.value,
      name: true,
      category: false
    })
  }

  onSelectCategory = (event) => {
    this.textInput.current.value = ""
    this.setState({
      search: event.target.value,
      name: false,
      category: true
    })
    // window.location.reload(false)
    // console.log(filteredSubscriptionsByCategory)
    // console.log(this.renderSubscriptions(filteredSubscriptionsByCategory))
  }

  getUniqueCategories = (subscriptions) => {
    let arr = []
    subscriptions.map(subscription => {
      return arr.push(subscription.category)
    })
    let categories = [...new Set(arr)]
    return categories
  }

  renderCategories = (categories) => {
    return categories.map((category, index) => {
      return (
        <option key={index} value={category}>{category.toLowerCase()}</option>
      )
    })
  }

  deleteSubscription = async (id) => {
      this.context.dispatch("delete", id)
      fetch(`${process.env.REACT_APP_BACKEND_URL}/subscriptions/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    };

  renderSubscriptions = (subscriptions) => {
      return subscriptions.map((subscription, index) => {
      return (
          <div key={index} className="subscription">
          <h3>{subscription.name}</h3>
          <p>$: {subscription.payment_amount}</p>
          <p>{subscription.payment_date}</p>
          <p>{subscription.category_name}</p>
          <div className="edit-delete-container">
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
    // console.log(subscriptions);
    // console.log(this.state.search)
    const categories = this.getUniqueCategories(subscriptions)
    const filteredSubscriptions = subscriptions.filter(subscription => {
      if (this.state.name) {
        return subscription.name.toLowerCase().includes(this.state.search)
      }
      else {
        return subscription.category.toLowerCase().includes(this.state.search) 
      }
    })

    return (
      subscriptions.length === 0 ? (
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
        <select onChange={this.onSelectCategory}>
          <option value="">Category</option>
          {this.renderCategories(categories)}
        </select>
        {this.renderSubscriptions(filteredSubscriptions)}
      </>
    )
    )}
    
}


export default Subscriptions