import React from 'react';
import PropTypes from 'prop-types';

const PollOption = function PollOption({
  id, title, onChange, checked,
}) {
  return (
    <li className="list-group-item">
      <input type="radio" name="pollOptions" value={id} onChange={onChange} checked={checked} />
      {' '}
      {title}
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
