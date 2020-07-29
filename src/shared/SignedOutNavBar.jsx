import React, { useState } from "react"
import { Link } from 'react-router-dom'

function SignedOutNavBar () {

    const [isExpanded, toggleExpansion] = useState(false)
    
    return (
      <>
        {/* <div className="flex items-center justify-between flex-wrap bg-teal-500 p-6"> */}
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl tracking-tight">Susscribe</span>
          </div>

          <div id="hamburgerbtn" className="block lg:hidden">
            <button onClick={() => toggleExpansion(!isExpanded)} className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white" >
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                {/* <path v-if="isOpen" fill-rule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                <path v-if="!isOpen" fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/> */}
            </button>
          </div>    
          
          <div className={`${ isExpanded ? `block` : `hidden` } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
            {/* <div className="text-sm lg:flex-grow"> */}
              <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/">Features</Link>
              <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/">Pricing</Link>
              <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/login">Log In</Link>
              <Link className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/sign-up">Sign Up</Link>
            {/* </div> */}
          </div>
      {/* </div> */}
    </>
    )
}

export default SignedOutNavBar