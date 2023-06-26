import React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Mutation, Query } from 'react-apollo';
import { Formik } from 'formik';
import FacebookProvider, { ShareButton } from 'react-facebook';

import GET_POLL from '../graphql/Poll.gql';
import GET_POLLS from '../graphql/PollList.gql';
import DELETE_POLL from '../graphql/DeletePoll.gql';

import Loading from './Loading';
import PollOptionList from './PollOptionList';
import PollChart from './PollChart';

import onError from '../utils/onError';

const PollViewer = function PollViewer(props) {
  const { history, match: { params: { id } } } = props;

  const variables = { id };

  const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

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
              if (loading) return <Loading container="page" />;

              if (error) {
                onError(error);
              }

              const { poll } = data;

              return (
                <Formik
                  onSubmit={(values, { setSubmitting }) => {
                    mutate({ variables: { id } })
                      .then(() => history.push('/myPolls'))
                      .catch((err) => {
                        setSubmitting(false);
                        onError(err);
                    });
                  }}

                  render={({
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <div className="m-3">
                      <div className="row">
                        <div className="col-sm-6">
                          <h1 className="h2">{poll.question}</h1>
                          <div className="row">
                            <div className="col col-auto">
                              <FacebookProvider appId="445598382444876">
                                <ShareButton
                                  href={`https://qikpoll.herokuapp.com/poll/${id}`}
                                  className="btn btn-sm fb-login-button d-inline"
                                  iconClassName="fa fa-2x fa-facebook-official align-middle"
                                >
                                  <span className="align-middle">Share</span>
                                </ShareButton>
                              </FacebookProvider>
                            </div>
                            {currentUser && currentUser.id === poll.userId &&
                            <div className="col">
                              <form onSubmit={handleSubmit}>
                                <button type="submit" className="btn btn-danger" disabled={isSubmitting}>
                                  {isSubmitting ? <span><Loading container="button" />Deleting</span> : 'Delete'}
                                </button>
                              </form>
                            </div>}
                          </div>
                          <PollOptionList
                            pollId={id}
                            pollOptions={poll.pollOptions}
                            isDeleting={isSubmitting}
                          />
                          <div />
                        </div>
                        <div className="col-sm-6">
                          <h2 className="h4">Current Results</h2>
                          <hr />
                          <PollChart options={poll.pollOptions} />
                        </div>
                      </div>
                    </div>
                  )}
                />);
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
