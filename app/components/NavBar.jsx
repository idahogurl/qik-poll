import React, { PureComponent } from 'react';
import FacebookProvider, { Login } from 'react-facebook';
// import utils from '../utils/user';

class NavBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { displayName: this.props.displayName };

    this.handleResponse = this.handleResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  async handleResponse(data) {
    /* eslint-disable camelcase */
    const {
      id, first_name, name, email,
    } = data.profile;

    const user = {
      facebook_id: id,
      first_name,
      full_name: name,
      email,
    };

    // const userCount = await utils.userExists(id, this.props.client);

    // if (userCount === 0) {
    //   const data = await utils.createUser(user, this.props.client);
    // }
    // call endpoint to create cookie
    this.setState({ displayName: first_name });
    /* eslint-enable camelcase */
  }

  handleError(error) {
    // this.setState({ error })
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
                onError={this.handleError}
                render={({ isLoading, isWorking, onClick }) => (
                  <button className={`btn btn-sm fb-login-button${!displayName ? ' d-block' : ' d-none'}`} onClick={onClick}>
                    <i className="fa fa-2x fa-facebook-official align-middle" />
                    <span className="align-middle">
                      Login with Facebook
                      {(isLoading || isWorking) && (<span>Loading...</span>)}
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
