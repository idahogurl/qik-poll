import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { FelaComponent } from 'react-fela';
import NavBar from '../components/NavBar';
import PollList from '../components/PollList';
import PollEditor from '../components/PollEditor';
import PollViewer from '../components/PollViewer';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
};

const IndexScreen = function IndexScreen() {
  return (
    <FelaComponent style={style}>
      <div className="navbar-wrapper">
        <NavBar />
      </div>
      <div className="container-fluid commands-wrapper">
        <div className="container-fluid">
          <div className="row main text-center">
            <NavLink to="/viewPolls">
              <div className="col col-xs-2 first-col">
                <img src="images/clipboard.png" alt="View Polls" className="d-none d-sm-block" />
                View Polls
              </div>
            </NavLink>
            <NavLink to="/myPolls">
              <div className="col col-xs-2">
                <img src="images/myPolls.png" alt="My Polls" className="d-none d-sm-block" />
                My Polls
              </div>
            </NavLink>
            <NavLink to="/newPoll">
              <div className="col col-xs-2">
                <img src="images/clipboardNew.png" alt="New Poll" className="d-none d-sm-block" />
                New Poll
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/viewPolls" component={PollList} />
        <Route path="/myPolls" component={PollList} />
        <Route path="/newPoll" component={PollEditor} />
        <Route path="/poll/:id" component={PollViewer} />
        <Route exact path="/" component={PollList} />
      </Switch>
      <a href="https://www.freepik.com/free-vector/people-avatars_761436.htm">Designed by Freepik</a>
      <a href="https://www.freepik.com/free-vector/round-background-with-person-filling-out-a-form_1078424.htm">Designed by Freepik</a>
    </FelaComponent>
  );
};

export default IndexScreen;
