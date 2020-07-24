import React from 'react'
import { Link } from "react-router-dom";
// import moment from 'moment'
import { SubscriptionsContext } from '../context/subscriptions-context'
import NoSubscriptions from "./NoSubscriptions";

class Subscriptions extends React.Component {
    static contextType = SubscriptionsContext;

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
            {/* <p>{moment(subscription.updated_at).startOf('minute').fromNow()}</p> */}
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
        const { subscriptions } = this.context
        return subscriptions.length === 0 ? (
          <NoSubscriptions />
        ) : this.renderSubscriptions(subscriptions)
      }
    }

export default Subscriptions