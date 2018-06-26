import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FacebookProvider, { Login } from 'react-facebook';
import { processResponse, handleError } from '../utils/facebookResponse';

class LoginButton extends PureComponent {
  handleResponse = this.handleResponse.bind(this);

  async handleResponse({ profile }) {
    try {
      await processResponse(profile);
      this.props.onLogin(profile);
    } catch (err) {
      handleError(err);
    }
  }

  render() {
    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

    return (
      <FacebookProvider appId="445598382444876">
        <Login
          onResponse={this.handleResponse}
          onError={handleError}
          render={({ isLoading, isWorking, onClick }) => (
            <button
              className={`btn btn-sm fb-login-button${!currentUser ? ' d-block' : ' d-none'}`}
              onClick={onClick}
            >
              <i className="fa fa-2x fa-facebook-official align-middle" />
              <span className="align-middle">
                {isLoading || isWorking ? 'Loading ...' : 'Login via Facebook'}
              </span>
            </button>)}
        />
      </FacebookProvider>);
  }
}

LoginButton.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginButton;
