import React from 'react'
import { Link } from 'react-router-dom'

const NoSubscriptions = () => (
  <h1 data-testid="no-subscriptions" className="no-subscriptions">You haven't <Link to="/subscriptions/new">created</Link> any subscriptions yet <span role="img" aria-label="link identifier">🔗</span>!</h1>
)

export default NoSubscriptions