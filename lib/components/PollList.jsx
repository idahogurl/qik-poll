import PropTypes from 'prop-types';

import { useQuery } from '@apollo/client';

import GET_POLLS from '../graphql/PollList.gql';

import Spinner from './Spinner';
import ErrorNotification from './ErrorNotification';
import PollListItem from './PollListItem';
import Instructions from './Instructions';

function PollList({ userId }) {
  const variables = { order: 'created_at ASC' };
  if (userId) variables.where = JSON.stringify({ userId });

  const {
    loading, data, error, refetch,
  } = useQuery(GET_POLLS, {
    variables,
    fetchPolicy: 'network-only',
  });

  if (loading) return <Spinner />;

  if (error) return <ErrorNotification onDismiss={refetch} />;

  if (!data.polls) return <Instructions>Login to make a poll.</Instructions>;

  // Include poll if Not viewing My Polls or viewing My Polls and poll belongs to current user
  const listItems = data.polls
    .map((li) => <PollListItem id={li.id} title={li.question} key={li.id} />);

  return (
    <>
      {!userId && (
      <Instructions>
        Select a poll to see the results and vote,
        or login to make a poll.
      </Instructions>
      )}
      <ul className="list-group">{listItems}</ul>
    </>
  );
}

PollList.propTypes = {
  userId: PropTypes.string,
};

PollList.defaultProps = {
  userId: undefined,
};

export default PollList;
