import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { processResponse, handleError } from '../utils/facebookResponse';

class LoginButton extends PureComponent {
  constructor(props) {
    super(props);
    const window = global;
    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));
    this.state = { displayName: currentUser ? currentUser.first_name : null };
    this.handleResponse = this.handleResponse.bind(this);
  }

  async handleResponse(data) {
    try {
      await processResponse(data);
      this.props.onLogin(data);
    } catch (err) {
      handleError(err);
    }
  }

  render() {
    const { displayName } = this.state;

    return (
      <FacebookLogin
        appId="1088597931155576"
        autoLoad
        fields="id,first_name,name,email"
        callback={this.handleResponse}
        render={renderProps => (
          <button className={`btn btn-sm fb-login-button${!displayName ? ' d-block' : ' d-none'}`} onClick={renderProps.onClick}>
            <i className="fa fa-2x fa-facebook-official align-middle" />
            <span className="align-middle">
              {renderProps.isProcessing ? 'Loading ...' : 'Login with Facebook'}
            </span>
          </button>
      )}
      />
    );
  }
}

LoginButton.propTypes = {
  onLogin: PropTypes.func.isRequired,
};


export default LoginButton;
