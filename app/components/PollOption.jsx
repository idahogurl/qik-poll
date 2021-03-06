import React from 'react';
import PropTypes from 'prop-types';

const PollOption = function PollOption(props) {
  return (
    <li className="list-group-item">
      <input type="radio" name="pollOptions" value={props.id} onChange={props.onChange} checked={props.checked} /> {' '}
      {props.title}
    </li>
  );
};

PollOption.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default PollOption;
