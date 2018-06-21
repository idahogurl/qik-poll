import React from 'react';
import PropTypes from 'prop-types';

const PollOption = function PollOption(props) {
  return (
    <li className="list-group-item">
      <input type="radio" name="pollOptions" value={props.id} /> {' '}
      {props.title}
    </li>
  );
};

PollOption.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.any.isRequired,
};

export default PollOption;
