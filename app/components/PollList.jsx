import React, { Fragment } from 'react';
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
    if (!currentUser) return <Instructions>Login to view your polls.</Instructions>;

    if (currentUser) {
      where.user_id = currentUser.id;
    }
  }

  const variables = {
    order: 'created_at ASC',
    where: JSON.stringify(where),
  };

  return (
    <div className="p-3">
      <Query query={getPolls} variables={variables}>
        {({ loading, error, data }) => {
        if (loading) return <Loader />;

        if (error) {
          onError(error);
        }

        if (!data.polls) return <Instructions>Login to make a new poll.</Instructions>;

        const listItems = data.polls.map(li =>
          <PollListItem id={li.id} title={li.prompt} key={li.id} />);

        return (
          <Fragment>
            <Instructions>Select a poll to see the results and vote,
              or login to make a new poll.
            </Instructions>
            <ul className="list-group">{listItems}</ul>
          </Fragment>);
      }}
      </Query>
    </div>
  );
};

PollList.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default PollList;
