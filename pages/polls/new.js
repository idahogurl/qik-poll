import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { Formik } from 'formik';
import classNames from 'classnames';
import { getServerSession } from 'next-auth';

import CREATE_POLL from '../../lib/graphql/PollEditor.gql';

import { authOptions } from '../api/auth/[...nextauth]';

import Spinner from '../../lib/components/Spinner';
import ErrorNotification from '../../lib/components/ErrorNotification';
import Layout from '../../lib/components/Layout';

function PollEditor({ sessionUserId }) {
  const [createMutation, { loading, error, reset }] = useMutation(CREATE_POLL);
  const router = useRouter();

  return (
    <Layout>
      <Formik
        initialValues={{
          question: '',
          options: '',
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validate={(values) => {
          const errors = {};
          if (values.question.trim() === '') errors.question = 'Please enter a question';
          if (values.question.length > 255) errors.question = 'Must be less than 255 characters';
          if (values.options.trim() === '') errors.options = 'Please enter options';
          return errors;
        }}
        onSubmit={async (values) => {
          const { data: { createPoll } } = await createMutation(
            {
              variables: { input: { ...values, userId: sessionUserId } },
            },
          );
          router.push(`/polls/${createPoll.id}`);
        }}
      >
        {({
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="px-4 py-3">
            <h1>New Poll</h1>
            {loading && <Spinner />}
            {error && <ErrorNotification onDismiss={reset} />}
            <div className="form-group">
              <label className="control-label" htmlFor="question">
                Question
                <input
                  type="text"
                  id="question"
                  name="question"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classNames('form-control', { 'is-invalid': errors.question })}
                />
              </label>
              {errors.question ? <small className="text-danger">{errors.question}</small>
                : <small className="text-muted"> Must not be greater than 255 characters</small>}
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="options">
                Options (separated by line):
                <textarea
                  id="options"
                  name="options"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classNames('form-control', { 'is-invalid': errors.options })}
                />
              </label>
              {errors.options && <small className="text-danger">{errors.options}</small>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <span>
                  <Spinner />
                  Saving
                </span>
              ) : 'Create'}
            </button>
          </form>
        )}
      </Formik>
    </Layout>
  );
}

PollEditor.propTypes = {
  sessionUserId: PropTypes.string.isRequired,
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      sessionUserId: session.user.id,
    },
  };
}

export default PollEditor;
