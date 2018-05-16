import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function IndexScreen(props) {
  return (
    <div>
      <div className="navbar-wrapper">
        <NavBar />
      </div>
      <div className="container-fluid commands-wrapper">
        <div className="container">
          <div className="row main text-center">
            <div className="col col-xs-2 selected first-col">
              <Link to="/viewPolls">
                <img src="images/clipboard.png" alt="" /><br />View Polls
              </Link>
            </div>
            <div className="col col-xs-2">
              <Link to="/myPolls"><img src="images/myPolls.png" alt="" /><br />My Polls</Link>
            </div>
            <div className="col col-xs-2">
              <Link to="/newPoll"><img src="images/clipboardNew.png" alt="" /><br />New Poll</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
