import PropTypes from 'prop-types';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';

import { Formik } from 'formik';

import GET_POLL from '../../lib/graphql/Poll.gql';
import DELETE_POLL from '../../lib/graphql/DeletePoll.gql';

import PollOptionList from '../../lib/components/PollOptionList';
import PollChart from '../../lib/components/PollChart';
import Spinner from '../../lib/components/Spinner';
import ErrorNotification from '../../lib/components/ErrorNotification';
import FbSharePollButton from '../../lib/components/FbSharePollButton';
import Layout from '../../lib/components/Layout';

function DeletePollButton({ id }) {
  const router = useRouter();
  const [deleteMutation, { error }] = useMutation(DELETE_POLL);
  return (
    <Formik
      initialValues={{ id }}
      onSubmit={(values, { setSubmitting }) => {
        deleteMutation({ variables: { id: values.id } })
          .then(() => {
            router.push('/polls/my');
          })
          .catch(() => {
            setSubmitting(false);
          });
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <div className="col">
          {error && <ErrorNotification />}
          <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-danger" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>
                  <Spinner />
                  Deleting
                </span>
              ) : 'Delete'}
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
}

DeletePollButton.propTypes = {
  id: PropTypes.string.isRequired,
};

function PollViewer({ pollId, sessionUserId }) {
  const {
    loading, data, error, refetch,
  } = useQuery(GET_POLL, {
    variables: { id: pollId },
    fetchPolicy: 'network-only',
  });

  if (loading) return <Spinner />;
  if (error) return <ErrorNotification onDismiss={refetch} />;

  const { poll } = data;
  return (
    <div className="m-3">
      <div className="row">
        <div className="col-sm-6">
          <h1 className="h2">{poll.question}</h1>
          <div className="row align-items-center">
            <div className="col col-auto"><FbSharePollButton pollId={poll.id} /></div>
            {sessionUserId === poll.userId && <DeletePollButton id={poll.id} /> }
          </div>
          <PollOptionList
            pollId={poll.id}
            pollOptions={poll.pollOptions}
            refetch={refetch}
            // isDeleting={isSubmitting}
          />
        </div>
        <div className="col-sm-6">
          <h2 className="h4">Current Results</h2>
          <PollChart options={poll.pollOptions} />
        </div>
      </div>
    </div>
  );
}

PollViewer.propTypes = {
  pollId: PropTypes.string.isRequired,
  sessionUserId: PropTypes.string,
};

PollViewer.defaultProps = {
  sessionUserId: undefined,
};

export default function ViewPoll() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  return (
    <Layout>
      {loading
        ? <Spinner />
        : <PollViewer pollId={router.query.id} sessionUserId={session?.user.id} />}
    </Layout>
  );
}
