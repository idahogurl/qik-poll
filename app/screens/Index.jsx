import React, { Fragment } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import classNames from 'classnames';
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

const IndexScreen = function IndexScreen(props) {
  if (window.location.protocol === 'http:' && window.location.hostname !== 'localhost') {
    window.location.href = window.location.href.replace('http', 'https');
  }

  return (
    <FelaComponent
      style={style}
      render={({ className }) => (
        <Fragment>
          <div className={classNames('navbar-wrapper', className)}>
            <NavBar {...props} />
          </div>
          <div className="container-fluid commands-wrapper">
            <div className="container-fluid">
              <div className="row main text-center">
                <NavLink to="/viewPolls">
                  <div className="col col-xs-4 first-col">
                    <img src="images/clipboard.svg" alt="View Polls" className="d-none d-sm-block" />
                    <div >View Polls</div>
                  </div>
                </NavLink>
                <NavLink to="/myPolls">
                  <div className="col col-xs-4">
                    <img src="images/myPolls.svg" alt="My Polls" className="d-none d-sm-block" />
                    <div>My Polls</div>
                  </div>
                </NavLink>
                <NavLink to="/newPoll">
                  <div className="col col-xs-4">
                    <img src="images/clipboardNew.svg" alt="New Poll" width="36px" className="d-none d-sm-block" />
                    <div>New Poll</div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <Switch>
              <Route path="/viewPolls" component={PollList} />
              <Route path="/myPolls" component={PollList} />
              <Route path="/newPoll" component={PollEditor} />
              <Route path="/poll/:id" component={PollViewer} />
              <Route exact path="/" component={PollList} />
            </Switch>
            <div className="text-right m-3">
              <small>
                <a href="https://www.freepik.com/free-vector/people-avatars_761436.htm">Icon</a> and&nbsp;
                <a href="https://www.freepik.com/free-vector/round-background-with-person-filling-out-a-form_1078424.htm">icon</a>&nbsp;designed by Freepik
              </small>
            </div>
          </div>
        </Fragment>)}
    />
  );
};

export default IndexScreen;
