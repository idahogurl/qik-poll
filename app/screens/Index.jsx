import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import PollList from '../components/PollList';

export default function IndexScreen() {
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
      <Switch>
        <Route exact match="/" component={PollList} />
        <Route match="/viewPolls" component={PollList} />
        <Route match="/myPolls" component={PollList} />
        <Route match="/newPoll" component={PollList} />
      </Switch>

    </div>
  );
}
