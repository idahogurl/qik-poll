import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class PollListItem extends PureComponent {
  render() {
    return (<li className="list-group-item"><Link to={`/poll/${this.props.id}`}>{this.props.title}</Link></li>);
  }
}

PollListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PollListItem;
