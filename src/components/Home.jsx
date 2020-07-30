import React from "react";
import { Link } from "react-router-dom";
import sub from "../assets/pic/sub.jpeg";
import set from "../assets/pic/setreminder.jpeg";
import get from "../assets/pic/getreminder.jpeg";

class Home extends React.Component {
  render() {
    return (
      <>
      <div className="Home-container active">
        <div className="text-container text-center pt-15">
          <div className="text-wrapper">
            <div className=" text-4xl pb-4">SUSSCRIBE</div>
            <div className=" font-thin text-1xl pb-4">Sign up with us :)</div>
            <Link
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              to="/sign-up"
            >
              SIGN UP FOR FREE
            </Link>
          </div>
        </div>
      </div>
              <div className="flex items-center gap-6 pt-10">
                <div className="add w-full ">
                  <div className="flex-1 w-full  max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full img-size" src={sub} alt="sub-page" />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">Add Subscriptions</div>
                      <p className="text-gray-700 text-base">
                        Have you ever had trouble managing your growing number of
                        subscriptions so that you can see what you've subscribed to at
                        a glance? Try our management app service, your one-stop
                        subscription service manager！
                      </p>
                    </div>
                  </div>
                </div>
                <div className="set w-full ">
                  <div className="flex-1 w-full max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full img-size" src={set} alt="set-page" />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">Set a reminder</div>
                      <p className="text-gray-700 text-base">
                        Set reminders for your subscription service, manage the due dates of all subscriptions, and stop worrying about missing payment dates and wasting money on unneeded subscriptions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="get w-full ">
                  <div className="flex-1 w-full max-w-sm rounded overflow-hidden shadow-lg">
                    <img className="w-full img-size" src={get} alt="get-page" />
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">Get a reminder</div>
                      <p className="text-gray-700 text-base">
                        Getting timely notifications makes it easy for you to manage your subscription service without feeling sorry for missing your subscription time, and don't worry about unsubscribing late.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              </>
    );
  }
}

export default Home;
