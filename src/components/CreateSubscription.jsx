import React from "react";
import { SubscriptionsContext } from "../context/subscriptions-context";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SiteTemplate from "../template/SiteTemplate";

class CreateSubscription extends React.Component {
  static contextType = SubscriptionsContext;
  onInputChange = (event) => {
    const key = event.target.id;
    if (event.target?.files) {
      this.setState({
        [key]: event.target.files[0],
      });
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
    var data = new FormData();
    for (let key in this.state) {
      data.append(`subscription[${key}]`, this.state[key]);
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
    this.context.dispatch("add", { ...subscription });
    this.props.history.push("/subscriptions");
  };

  state = {
    payment_date: new Date(),
  };
  handleChange = (date) => {
    this.setState({
      payment_date: date,
    });
  };

  render() {
    return (
      <SiteTemplate>
        <div className="container">
          <h1 className="text-2xl flex-1 text-gray-700 text-center px-4 py-2 m-2">
            New Subscription
          </h1>
          <form className="w-full max-w-lg" onSubmit={this.onFormSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="text-xl block tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="eg) Netflix"
                  name="name"
                  id="name"
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="text-xl block tracking-wide text-gray-700 text-xs font-bold mb-2 "
                  htmlFor="payment_amount"
                >
                  Amount
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="AUD"
                  name="payment_amount"
                  id="payment_amount"
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="text-xl block tracking-wide text-gray-700 text-xs font-bold mb-2 "
                  htmlFor="category_name"
                >
                  Category:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  name="category_name"
                  id="category_name"
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="text-xl block tracking-wide text-gray-700 text-xs font-bold mb-2 "
                  htmlFor="payment_date"
                >
                  Payment Date
                </label>
                <DatePicker
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  selected={this.state.payment_date}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <input
              className="bg-white hover:bg-gray-100 text-gray font-semibold py-2 px-4 rounded shadow"
              type="button"
              value="CANCEL"
              onClick={() => {
                this.props.history.go(-1);
              }}
            />
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button-left"
              type="submit"
              value="CREATE"
            />
          </form>
        </div>
      </SiteTemplate>
    );
  }
}

export default CreateSubscription;
