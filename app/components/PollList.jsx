import React from 'react';
import { Query } from 'react-apollo';
import { getPolls } from '../graphql/polls.gql';
import PollListItem from './PollListItem';
import Instructions from './Instructions';

const PollList = function PollList() {
  const variables = {
    order: 'created_at ASC',
    where: '{"published": 0}',
  };

  return (
    <Query query={getPolls} variables={variables}>
      {({ loading, error, data }) => {
    if (loading) return <div>Loading...</div>;

    if (error) {
      return <div>An unexpected error occurred.</div>;
    }

    if (!data.polls) return <Instructions>Login to make a new poll.</Instructions>;

    const listItems = data.polls.map(li =>
      <PollListItem id={li.id} title={li.title} key={li.id} />);

    return (
      <div className="container">
        <Instructions>Select a poll to see the results and vote,
          or login to make a new poll.
        </Instructions>
        <ul className="list-group">{listItems}</ul>
      </div>
      );
  }}
    </Query>);
};

export default PollList;
