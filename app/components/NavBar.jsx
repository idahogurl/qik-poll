import React, { PureComponent } from 'react';
import { get } from 'axios';
import LoginButton from './LoginButton';
import onError from '../utils/onError';

class NavBar extends PureComponent {
  constructor(props) {
    super(props);

    const window = global;
    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

    this.state = { displayName: currentUser ? currentUser.first_name : null };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin(data) {
    this.setState({ displayName: data.first_name });
    const window = global;
    window.sessionStorage.setItem('currentUser', JSON.stringify(data));
  }

  async onLogout() {
    try {
      await get('/logout');
      window.sessionStorage.clear();
      this.setState({ displayName: null });
    } catch (err) {
      onError('An unknown error occurred. Contact support if this issue continues.', err);
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
              <span>Welcome, {displayName}! | <a className="menu" onClick={this.onLogout} href="/">Logout</a></span>
            </span>
            {!displayName && <LoginButton onLogin={this.onLogin} />}
          </span>
        </div>
      </nav>);
  }
}

export default NavBar;
