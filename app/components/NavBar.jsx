import React, { PureComponent } from 'react';
import FacebookProvider, { Login } from 'react-facebook';
import { processResponse, handleError } from '../utils/facebookResponse';

class NavBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { displayName: null };
    this.handleResponse = this.handleResponse.bind(this);
  }

  async handleResponse(data) {
    try {
      await processResponse(data);
      this.setState({ displayName: data.first_name });
    } catch (err) {
      handleError(err);
    }
  }

  render() {
    const { displayName } = this.state;

    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <img src="images/logo_sm.png" alt="QikPoll Logo" />
          </div>
          <span className="nav navbar-right">
            <span id="userAccount" className={!displayName ? 'd-none' : 'd-block'}>
              <span>Welcome, {displayName}! | <a className="menu" href="/logout">Logout</a></span>
            </span>
            <FacebookProvider appId="445598382444876">
              <Login
                scope="email"
                onResponse={this.handleResponse}
                onError={handleError}
                render={({ isWorking, onClick }) => (
                  <button className={`btn btn-sm fb-login-button${!displayName ? ' d-block' : ' d-none'}`} onClick={onClick}>
                    <i className="fa fa-2x fa-facebook-official align-middle" />
                    <span className="align-middle">
                      Login with Facebook
                      {(isWorking) && (<span>Loading...</span>)}
                    </span>
                  </button>
            )}
              />
            </FacebookProvider>
          </span>
        </div>
      </nav>);
  }
}

export default NavBar;
