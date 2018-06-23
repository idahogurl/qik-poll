import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import classNames from 'classnames';
import { createPoll, getPolls } from '../graphql/polls.gql';
import Instructions from './Instructions';
import onError from '../utils/onError';

const PollEditor = function PollEditor(props) {
  const { window } = global;
  const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

  if (!currentUser) return <Instructions>Login to create a poll.</Instructions>;

  return (
    <Mutation
      mutation={createPoll}
      update={(cache, { data: { createPoll: createdPoll } }) => {
            const { polls } = cache.readQuery({ query: getPolls });
            cache.writeQuery({
              query: getPolls,
              data: { polls: polls.concat([createdPoll]) },
            });
          }}
    >
      {createMutation => (<Formik
        initialValues={{
          prompt: props.prompt,
          options: props.options,
        }}

        validate={(values) => {
          const errors = {};
          if (values.prompt.trim() === '') errors.prompt = 'Please enter a question';
          if (values.prompt.length > 255) errors.prompt = 'Must be less than 255 characters';
          if (values.options.trim() === '') errors.options = 'Please enter options';
          return errors;
        }}

        onSubmit={async (values, { setSubmitting }) => {
          try {
            await createMutation({ variables: { input: { ...values, userId: currentUser.id } } });
            setSubmitting(false);
          } catch (err) {
            setSubmitting(false);
            onError(err);
          }
        }}

        render={({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (

          <form onSubmit={handleSubmit} className="px-4 py-3">
            <h1>{props.prompt ? 'Edit' : 'New'} Poll</h1>
            <div className="form-group">
              <label className="control-label" htmlFor="prompt">Question</label>
              <input
                type="text"
                id="prompt"
                name="prompt"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.prompt}
                className={classNames('form-control', { 'is-invalid': errors.prompt })}
              />
              {errors.prompt ? <small className="text-danger">{errors.prompt}</small> :
              <small className="text-muted">Must not be greater than 255 characters</small>}
            </div>
            <div className="form-group">
              <label className="control-label" htmlFor="options">Options (seperated by line):</label>
              <textarea
                id="options"
                name="options"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.options}
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
  prompt: PropTypes.string,
  options: PropTypes.string,
};

PollEditor.defaultProps = {
  prompt: '',
  options: '',
};

export default PollEditor;
