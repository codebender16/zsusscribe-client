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

  // handleSelectChange = (keywords) => {
  //   this.setState({keywords})
  //   console.log(`Option selected:`, keywords);
  // }


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
    console.log(this.context);
    const foundSubscription = this.context.subscriptions.find((subscription) => {
      return subscription.id === Number(this.state.id)
    })
    console.log(foundSubscription);
    this.setState({ ...foundSubscription, loading: false });
    // console.log(this.props);
  }

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
          <h1 className="text-2xl flex-1 text-gray-700 text-center px-4 py-2 m-2">Edit the subscription</h1>
          <form className="w-full max-w-lg" onSubmit={this.onFormSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="text-xl block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Name</label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onInputChange}
                  value={name}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">  
                <label className="text-xl block tracking-wide text-gray-700 text-xs font-bold mb-2 " htmlFor="category_name">Category:</label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="category_name" id="category_name" onChange={this.onInputChange} value={this.state.category}/>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="text-xl block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="payment_amount">Payment Amount</label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  name="payment_amount"
                  id="payment_amount"
                  onChange={this.onInputChange}
                  value={payment_amount}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="text-xl block tracking-wide text-gray-700 text-xs font-bold mb-2 " htmlFor="payment_date">Payment Date</label>
                <DatePicker className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    selected={this.state.payment_date}
                    onChange={this.handleChange}
                    value={payment_date}
                />
              </div>
            </div>
                <input className="bg-white hover:bg-gray-100 text-gray font-semibold py-2 px-4 rounded shadow" type="button" value="CANCEL" onClick={()=> {this.props.history.go(-1)}} />
                <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button-left" type="submit" value="Submit" />
          </form>
        </>
      )
    );
  }  

}

export default EditSubscription;