import axios from 'axios';
import onError from '../utils/onError';

export function processResponse(data) {
  const {
    id, first_name: firstName, name, email,
  } = data.profile;

  const user = {
    facebook: id,
    firstName,
    name,
    email,
  };

  // axios
  return axios.post('/auth/facebook', user);
}

export function handleError(error) {
  onError('An unknown error has occurred. If this issue continues contact support.', error);
}
