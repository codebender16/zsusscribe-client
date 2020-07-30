import React, { useState } from "react";
import { Link } from "react-router-dom";

const handleLogout = (props) => {
  console.log(props);
  localStorage.removeItem("token");
  sessionStorage.removeItem("auth");
  props.context.dispatch("logout");
  props.history.push("/");
};

const SignedInNavBar = (props) => {
  const [isExpanded, toggleExpansion] = useState(false);
  return (
    <>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <span className="font-semibold text-xl tracking-tight">
            Susscribe
          </span>
        </Link>
      </div>

      <div id="hamburgerbtn" className="block lg:hidden">
        <button
          onClick={() => toggleExpansion(!isExpanded)}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        className={`${
          isExpanded ? `block` : `hidden`
        } justify-end w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <Link
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          to="/subscriptions"
        >
          Subscriptions
        </Link>
        <Link
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          to="/subscriptions/create"
        >
          Create Subscription
        </Link>
        <span
          className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          onClick={() => handleLogout(props)}
        >
          Logout
        </span>
      </div>
    </>
  );
};
export default SignedInNavBar;
