import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import GET_POLLS from '../graphql/PollList.gql';

import Loading from './Loading';
import PollListItem from './PollListItem';
import Instructions from './Instructions';

import onError from '../utils/onError';

const PollList = function PollList(props) {
  const { match: { path } } = props;

  const { window } = global;
  const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

  const viewMyPolls = path.includes('myPolls');

  // Must be logged in to view their polls
  if (viewMyPolls && !currentUser) return <Instructions>Login to view your polls.</Instructions>;

  return (
    <div className="p-3">
      <Query query={GET_POLLS} variables={{ order: 'created_at ASC' }}>
        {({ loading, error, data }) => {
        if (loading) return <Loading />;

        if (error) {
          onError(error);
        }

        if (!data.polls) return <Instructions>Login to make a poll.</Instructions>;

        // Include poll if Not viewing My Polls or viewing My Polls and poll belongs to current user
        const listItems =
          data.polls
            .filter(p => (!viewMyPolls ||
                (viewMyPolls && currentUser && p.userId === currentUser.id)))
            .map(li => <PollListItem id={li.id} title={li.question} key={li.id} />);

        return (
          <Fragment>
            <Instructions>Select a poll to see the results and vote,
              or login to make a poll.
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
