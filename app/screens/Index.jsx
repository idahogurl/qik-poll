import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { FelaComponent } from 'react-fela';
import NavBar from '../components/NavBar';
import NavBarImage from '../components/NavBarImage';
import Card from '../components/Card';
import PollList from '../components/PollList';
import PollEditor from '../components/PollEditor';
import PollViewer from '../components/PollViewer';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100vh',
};

const widths = {
  sm: '128px',
};

const IndexScreen = function IndexScreen(props) {
  return (
    <FelaComponent style={style}>
      <div className="navbar-wrapper">
        <NavBar {...props} />
      </div>
      <div className="container-fluid commands-wrapper">
        <div className="container-fluid">
          <div className="row main text-center">
            <NavLink to="/viewPolls">
              <div className="col col-xs-4 first-col">
                <NavBarImage src="images/clipboard.svg" alt="View Polls" width="48px" widths={widths} />
                <div className="d-none d-sm-block">View Polls</div>
              </div>
            </NavLink>
            <NavLink to="/myPolls">
              <div className="col col-xs-4">
                <NavBarImage src="images/myPolls.svg" alt="My Polls" width="48px" widths={widths} />
                <div className="d-none d-sm-block">My Polls</div>
              </div>
            </NavLink>
            <NavLink to="/newPoll">
              <div className="col col-xs-4">
                <NavBarImage src="images/clipboardNew.svg" alt="New Poll" width="48px" widths={widths} />
                <div className="d-none d-sm-block">New Poll</div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <Card>
          <Switch>
            <Route path="/viewPolls" component={PollList} />
            <Route path="/myPolls" component={PollList} />
            <Route path="/newPoll" component={PollEditor} />
            <Route path="/poll/:id" component={PollViewer} />
            <Route exact path="/" component={PollList} />
          </Switch>
          <div className="text-right m-3">
            <small>
              <a href="https ://www.freepik.com/free-vector/people-avatars_761436.htm">Icon</a> and&nbsp;
              <a href="https://www.freepik.com/free-vector/round-background-with-person-filling-out-a-form_1078424.htm">icon</a>&nbsp;designed by Freepik
            </small>
          </div>
        </Card>
      </div>
    </FelaComponent>
  );
};

export default IndexScreen;
