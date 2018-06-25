import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import classNames from 'classnames';

import CREATE_POLL from '../graphql/PollEditor.gql';
import GET_POLLS from '../graphql/PollList.gql';

import Instructions from './Instructions';
import onError from '../utils/onError';

const PollEditor = function PollEditor(props) {
  const { window } = global;
  const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

  if (!currentUser) return <Instructions>Login to make a poll.</Instructions>;

  const { history } = props;

  return (
    <Mutation
      mutation={CREATE_POLL}
      update={(cache, { data: { createPoll } }) => {
            const args = { query: GET_POLLS, variables: { order: 'created_at ASC' } };
            const { polls } = cache.readQuery(args);
            args.data = { polls: polls.push(createPoll) };
            cache.writeQuery(args);
          }}
    >
      {mutate => (<Formik
        initialValues={{
          question: '',
          options: '',
        }}

        validate={(values) => {
          const errors = {};
          if (values.question.trim() === '') errors.question = 'Please enter a question';
          if (values.question.length > 255) errors.question = 'Must be less than 255 characters';
          if (values.options.trim() === '') errors.options = 'Please enter options';
          return errors;
        }}

        onSubmit={(values, { setSubmitting }) => {
          mutate({ variables: { input: { ...values, userId: currentUser.id } } })
          .then(({ data: { createPoll: { id } } }) => {
           history.push(`/poll/${id}`);
          })
          .catch((err) => {
            setSubmitting(false);
            onError(err);
          });
        }}

        render={({
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (

          <form onSubmit={handleSubmit} className="px-4 py-3">
            <h1>New Poll</h1>
            <div className="form-group">
              <label className="control-label" htmlFor="question">Question</label>
              <input
                type="text"
                id="question"
                name="question"
                onChange={handleChange}
                onBlur={handleBlur}
                className={classNames('form-control', { 'is-invalid': errors.question })}
              />
              {errors.question ? <small className="text-danger">{errors.question}</small> :
              <small className="text-muted">Must not be greater than 255 characters</small>}
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="options">Options (seperated by line):</label>
              <textarea
                id="options"
                name="options"
                onChange={handleChange}
                onBlur={handleBlur}
                className={classNames('form-control', { 'is-invalid': errors.options })}
              />
              {errors.options && <small className="text-danger">{errors.options}</small>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? <span><i className="fa fa-circle-o-notch fa-spin" />Saving</span> : 'Create'}
            </button>
          </form>
        )}
      />)}
    </Mutation>);
};

PollEditor.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

export default PollEditor;
