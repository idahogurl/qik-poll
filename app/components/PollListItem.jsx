import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PollListItem = function PollListItem(props) {
  return (
    <li className="list-group-item">
      <Link to={`/poll/${props.id}`}>{props.title}</Link>
    </li>);
};

PollListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PollListItem;
