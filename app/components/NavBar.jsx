import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get } from 'axios';
import LoginButton from './LoginButton';
import HyperlinkButton from './HyperlinkButton';
import onError from '../utils/onError';

class NavBar extends PureComponent {
  constructor(props) {
    super(props);

    const window = global;
    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

    this.state = { displayName: currentUser ? currentUser.first_name : null };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
  }

  onLogin(data) {
    const window = global;
    window.sessionStorage.setItem('currentUser', JSON.stringify(data));
    this.setState({ displayName: data.first_name });
    this.refreshPage();
  }

  async onLogout() {
    try {
      await get('/logout');

      const window = global;
      window.sessionStorage.clear();

      this.setState({ displayName: null }, this.refreshPage());
    } catch (err) {
      onError('An unknown error occurred. Contact support if this issue continues.', err);
    }
  }

  refreshPage() {
    const { history, location, match } = this.props;

    history.replace({
      ...location,
      pathname: location.pathname.substring(match.path.length),
    });
  }

  render() {
    const { displayName } = this.state;

    return (
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <img src="images/logo_sm.svg" alt="QikPoll Logo" />
          </div>
          <span className="nav navbar-right">
            <span id="userAccount" className={!displayName ? 'd-none' : 'd-block'}>
              <span>Welcome, {displayName}! | <HyperlinkButton onClick={this.onLogout}>Logout</HyperlinkButton></span>
            </span>
            {!displayName && <LoginButton onLogin={this.onLogin} />}
          </span>
        </div>
      </nav>);
  }
}

NavBar.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

export default NavBar;
