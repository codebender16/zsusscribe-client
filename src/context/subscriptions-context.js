import React from 'react'

function dispatch(action, value) {
  switch(action) {
    case "populate":
      this.setState( { subscriptions: value.subscriptions, currentUser: value.currentUser } )
      break;
    case "add":
      this.setState((state) => {
        return { subscriptions: [...state.subscriptions, value] }
      })
      break;
    case "delete": 
      this.setState((state) => {
        const subscriptions = state.subscriptions.filter((subscription) => {
          return subscription.id !== value
        })
        return {
          subscriptions: subscriptions
        }
      })
      break;
    case "update": 
      this.setState((state) => {
        const subscriptions = state.subscriptions.map((subscription) => {
          if (value.id === subscription.id) {
            return value
          } else {
            return subscription
          }
        })
        return {
          subscriptions: subscriptions
        }
      })
      break;
    case "logout": 
      this.setState({ currentUser: false, subscriptions: [] })
      break;
    case "current user":
      this.setState({ currentUser: value })
      break;
    default: 
      console.log("in subscriptions")
  }
}

const SubscriptionsContext = React.createContext({
  subscriptions: [],
  dispatch: () => {},
  currentUser: false
})

export {
  SubscriptionsContext,
  dispatch
}