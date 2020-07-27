import React from "react";
import { SubscriptionsContext } from "../context/subscriptions-context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CreateSubscription extends React.Component {
    static contextType = SubscriptionsContext;
    onInputChange = (event) => {
        const key = event.target.id;
        if (event.target?.files) {
          this.setState({
            [key]: event.target.files[0]
          })
        } else {
          this.setState({
            [key]: event.target.value,
          });
        }
      };
      
    onFormSubmit = async (event) => {
        event.preventDefault();
        // const body = {
        //   subscription: this.state,
        // };
        var data = new FormData()
        for (let key in this.state) {
        data.append(`subscription[${key}]`, this.state[key])
        }
        // console.log(data);
        const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/subscriptions`,
        {
            method: "POST",
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: data,
        }
        );
        console.log(response);
        const { subscription } = await response.json();
        this.context.dispatch("add", {...subscription});
        this.props.history.push("/subscriptions");
    };

    state = {
        payment_date: new Date()
      };
    handleChange = date => {
        this.setState({
        payment_date: date
        });
    };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onFormSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" onChange={this.onInputChange}/>
          <label htmlFor="payment_amount">Payment Amount</label>
          <input type="text" name="payment_amount" id="payment_amount" onChange={this.onInputChange}/>
          <label htmlFor="category_name">Category Name</label>
          <input type="text" name="category_name" id="category_name" onChange={this.onInputChange}/>
          <label htmlFor="payment_date">Payment Date</label>
          <DatePicker
            selected={this.state.payment_date}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateSubscription;