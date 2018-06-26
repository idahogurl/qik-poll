import React, { PureComponent } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { get } from 'axios';
import LoginButton from './LoginButton';
import HyperlinkButton from './HyperlinkButton';
import onError from '../utils/onError';

class NavBar extends PureComponent {
  onLogin = this.onLogin.bind(this);
  refreshPage = this.refreshPage.bind(this);
  onLogout = this.onLogout.bind(this);

  onLogin(profile) {
    window.sessionStorage.setItem('currentUser', JSON.stringify(profile));
    this.refreshPage();
  }

  async onLogout() {
    try {
      await get('/logout');

      window.sessionStorage.clear();
      this.refreshPage();
    } catch (err) {
      onError(err);
    }
  }

  refreshPage() {
    const { history, location, match } = this.props;
    const pathname = `/${location.pathname.substring(match.path.length)}`;

    history.replace({
      ...location,
      pathname,
    });
  }

  render() {
    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

    return (
      <nav className="navbar">
        <img src="images/logo_sm.svg" alt="QikPoll Logo" />
        <div className="navbar-right mt-2 mt-sm-0">
          <span id="userAccount" className={!currentUser ? 'd-none' : 'd-block'}>
            <span>Welcome, {currentUser && currentUser.first_name}! |
              <HyperlinkButton onClick={this.onLogout}>Logout</HyperlinkButton>
            </span>
          </span>
          {!currentUser && <LoginButton onLogin={this.onLogin} />}
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
