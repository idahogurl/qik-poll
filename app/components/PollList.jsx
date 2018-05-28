import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PollListItem from './PollListItem';

class PollList extends PureComponent {
  render() {
    const listItems =
    this.props.polls.map(li => <PollListItem id={li.id} title={li.title} key={li.id} />);
    return <ul className="list-group">{listItems}</ul>;
  }
}

PollList.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default PollList;
