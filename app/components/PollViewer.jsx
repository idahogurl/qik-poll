import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Mutation, Query } from 'react-apollo';

import GET_POLL from '../graphql/Poll.gql';
import GET_POLLS from '../graphql/PollList.gql';
import DELETE_POLL from '../graphql/DeletePoll.gql';

import Loading from './Loading';
import PollOptionList from './PollOptionList';
import PollChart from './PollChart';

import onError from '../utils/onError';

// import FacebookProvider, { ShareButton } from 'react-facebook';

const PollViewer = function PollViewer(props) {
  const { history, match: { params: { id } } } = props;

  const variables = { id };

  const { window } = global;
  const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

  const onDelete = function onDelete(mutate) {
    mutate({ variables: { id } })
      .then(() => history.push('/myPolls'))
      .catch(err => onError(err));
  };

  return (
    <Mutation
      mutation={DELETE_POLL}
      update={(cache) => {
            const args = { query: GET_POLLS, variables: { order: 'created_at ASC' } };
            const { polls } = cache.readQuery(args);
            args.data = { polls: polls.filter(p => p.id !== id) };
            cache.writeQuery(args);
          }}
    >
      {mutate => (
        <Query query={GET_POLL} variables={variables}>
          {({ loading, error, data }) => {
              if (loading) return <Loading />;

              if (error) {
                onError(error);
              }

              const { poll } = data;

              return (
                <div className="m-3">
                  <div id="fb-root" />
                  <div className="row">
                    <div className="col-sm-6">
                      <h1 className="h2">{poll.question}</h1>

                      <input type="hidden" name="id" value={id} />
                      <PollOptionList pollId={id} pollOptions={poll.pollOptions} />
                      <div />
                    </div>
                    <div className="col-sm-6">
                      {currentUser && currentUser.id === poll.userId &&
                      <button className="btn btn-danger" onClick={() => onDelete(mutate)}>Delete</button>}
                      <PollChart options={poll.pollOptions} />
                    </div>
                  </div>
                </div>
              );
            }}
        </Query>)}
    </Mutation>
  );
};

PollViewer.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PollViewer;
