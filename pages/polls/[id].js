import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { FacebookShareButton, FacebookIcon } from 'react-share';

import GET_POLL from '../../lib/graphql/Poll.gql';
import GET_POLLS from '../../lib/graphql/PollList.gql';
import DELETE_POLL from '../../lib/graphql/DeletePoll.gql';

import PollOptionList from '../../lib/components/PollOptionList';
import PollChart from '../../lib/components/PollChart';
import { useQuery } from '@apollo/client';
import Spinner from '../../lib/components/Spinner';
import ErrorNotification from '../../lib/components/ErrorNotification';

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
        args.data = { polls: polls.filter((p) => p.id !== id) };
        cache.writeQuery(args);
      }}
    >
      {(mutate) => (
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
                          <FacebookShareButton
                            url={`https://qikpoll.herokuapp.com/poll/${id}`}
        
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
                          </div>
                          {currentUser && currentUser.id === poll.userId
                            && (
                            <div className="col">
                              <form onSubmit={handleSubmit}>
                                <button type="submit" className="btn btn-danger" disabled={isSubmitting}>
                                  {isSubmitting ? (
                                    <span>
                                      <Loading container="button" />
                                      Deleting
                                    </span>
                                  ) : 'Delete'}
                                </button>
                              </form>
                            </div>
                            )}
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
              />
            );
          }}
        </Query>
      )}
    </Mutation>
  );
};

export default function Page() {
  const router = useRouter();
  const {
    loading, data, error, refetch,
  } = useQuery(GET_POLL, {
    variables: { id: router.query.id },
    fetchPolicy: 'network-only',
  });

  if (loading) return <Spinner />;
  if (error) return <ErrorNotification onDismiss={refetch} />;
  

  return <p>Post: {data.poll.id}</p>
}