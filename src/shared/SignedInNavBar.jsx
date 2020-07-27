import React from "react";
import { Link } from "react-router-dom";

const handleLogout = (props) => {
  console.log(props)
  localStorage.removeItem("token");
  sessionStorage.removeItem("auth");
  props.context.dispatch("logout");
  props.history.push("/");
};

const SignedInNavBar = (props) => (
  <>
    <div>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Susscribe</span>
      </div>

    <Link to="/subscriptions">Subscriptions</Link>
    <Link to="/subscriptions/create">Create Subscription</Link>
    </div>

    {/* <div className="welcome-user">
      <span id="logout" onClick={() => handleLogout(props)}>
        Logout
      </span>
    </div> */}

    <div>
      <span onClick={() => handleLogout(props)}>
        Logout
      </span>
    </div>
  </>
);
export default SignedInNavBar;