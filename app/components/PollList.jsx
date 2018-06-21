import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { getPolls } from '../graphql/polls.gql';
import Loader from './Loader';
import PollListItem from './PollListItem';
import Instructions from './Instructions';
import onError from '../utils/onError';

const PollList = function PollList(props) {
  const where = {};

  const { match: { path } } = props;

  if (path.includes('myPolls')) {
    const { window } = global;
    const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));
    if (currentUser) {
      where.user_id = currentUser.id;
    }
  }

  if (path.includes('viewPolls')) {
    where.published = 1;
  }

  const variables = {
    order: 'created_at ASC',
    where: JSON.stringify(where),
  };

  return (
    <Query query={getPolls} variables={variables}>
      {({ loading, error, data }) => {
        debugger;
        if (loading) return <Loader />;
        if (error) {
          onError(error);
        }

        if (!data.polls) return <Instructions>Login to make a new poll.</Instructions>;

        const listItems = data.polls.map(li =>
          <PollListItem id={li.id} title={li.prompt} key={li.id} />);

        return (
          <div className="container-fluid">
            <Instructions>Select a poll to see the results and vote,
              or login to make a new poll.
            </Instructions>
            <ul className="list-group">{listItems}</ul>
          </div>
          );
      }}
    </Query>);
};

PollList.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default PollList;
