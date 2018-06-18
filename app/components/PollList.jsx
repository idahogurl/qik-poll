import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import PollListItem from './PollListItem';

const PollList = function PollList() {
  return <Query>
  </Query>
    const listItems =
    this.props.polls.map(li => <PollListItem id={li.id} title={li.title} key={li.id} />);
    return <ul className="list-group">{listItems}</ul>;
  }
}

PollList.propTypes = {
  polls: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default PollList;
