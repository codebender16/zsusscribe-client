import React from "react";
import { SubscriptionsContext } from '../context/subscriptions-context'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditSubscription extends React.Component {

  static contextType = SubscriptionsContext
  state = {
    name: "",
    payment_amount: "",
    payment_date: "",
    category_id: "",
    loading: true,
    id: this.props.match.params.id,
  };
  onInputChange = (event) => {
    const key = event.target.id;
    this.setState({
      [key]: event.target.value,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const { name, payment_amount, payment_date, created_at, user_id, category_id } = this.state;
    const id = this.props.match.params.id;
    console.log(this.state);
    this.context.dispatch("update", {
      name,
      payment_amount,
      payment_date,
      id,
      created_at,
      user_id,
      category_id,
      updated_at: new Date(),
    });
    fetch(`${process.env.REACT_APP_BACKEND_URL}/subscriptions/${this.props.match.params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ subscription: { name, payment_amount, payment_date, category_id } }),
    });
    this.props.history.push("/subscriptions");
    window.location.reload(false);
  };

  componentDidMount() {
    const foundSubscription = this.context.subscriptions.find((subscription) => {
      return subscription.id === this.state.id
    })
    this.setState({ ...foundSubscription, loading: false });
    console.log(this.props);
  }

  state = {
        payment_date: new Date()
  };
  handleChange = date => {
        this.setState({
        payment_date: date
        });
  };

  render() {
    const { name, payment_amount, payment_date, loading } = this.state;
    return (
      !loading && (
        <>
          <h1>Edit the subscription</h1>
          <form onSubmit={this.onFormSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={this.onInputChange}
              value={name}
            />
            <label htmlFor="payment_amount">Payment Amount</label>
            <input
              type="text"
              name="payment_amount"
              id="payment_amount"
              onChange={this.onInputChange}
              value={payment_amount}
            />
            <label htmlFor="payment_date">Payment Date</label>
            <DatePicker
                selected={this.state.payment_date}
                onChange={this.handleChange}
                value={payment_date}
            />
            <input type="submit" value="Submit" />
          </form>
        </>
      )
    );
  }  

}

export default EditSubscription;