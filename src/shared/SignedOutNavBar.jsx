import React from 'react'
import { Link } from 'react-router-dom'

const SignedOutNavBar = () => (
    <>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Susscribe</span>
      </div>
      <div className="text-sm lg:flex-grow">
          <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/">Features</Link>
          <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/">Pricing</Link>
          <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/login">Log In</Link>
          <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/sign-up">Sign Up</Link>
      </div>
    </>
)

export default SignedOutNavBar