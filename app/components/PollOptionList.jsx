import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { Formik } from 'formik';
import uuid from 'uuid/v4';

import GET_POLL from '../graphql/Poll.gql';
import VOTE_MUTATION from '../graphql/Vote.gql';

import Loading from './Loading';
import PollOption from './PollOption';

import onError from '../utils/onError';

const PollOptionList = function PollOptionList(props) {
  const { pollId, pollOptions, isDeleting } = props;
  return (
    <Mutation
      mutation={VOTE_MUTATION}
      update={(cache, { data: { vote } }) => {
        const args = { query: GET_POLL, variables: { id: pollId } };
        const { poll } = cache.readQuery(args);
        const pollOption = poll.pollOptions.find(p => p.id === vote.id);

        if (pollOption) {
          pollOption.votes = vote.votes;
        } else {
          poll.pollOptions.push(vote);
        }

        args.data = { poll };
        cache.writeQuery(args);
      }}
    >
      {mutate => (
        <Formik
          initialValues={{
            pollOptions: '',
            newOption: '',
            newOptionId: uuid(),
          }}

          validateOnBlur={false}
          validateOnChange={false}

          validate={(values) => {
            const errors = {};

            if (values.newOptionId === values.pollOptions) {
              if (values.newOption.trim() === '') errors.pollOptions = 'Please enter text for the new option';
              if (values.newOption.trim().length > 50) errors.pollOptions = 'Text for new option must be less than 50 characters';
            }

            if (values.pollOptions === '') errors.pollOptions = 'Please select an option or enter a new option';


            return errors;
          }}

          onSubmit={(values, { setSubmitting, resetForm }) => {
           mutate({
              variables: {
                id: values.pollOptions,
                input: { pollId, option: values.newOption },
              },
            })
            .then(() => {
              setSubmitting(false);
              resetForm();
            })
            .catch((err) => {
              setSubmitting(false);
              onError(err);
            });
          }}

          render={({
            values,
            errors,
            handleChange,
            setFieldValue,
            handleSubmit,
            isSubmitting,
          }) => {
            const options = pollOptions.map(li =>
              (<PollOption
                id={li.id}
                title={li.option}
                key={li.id}
                onChange={handleChange}
                checked={li.id === values.pollOptions}
              />));

            return (
              <form onSubmit={handleSubmit} className="px-4 py-3">
                <ul className="list-group">
                  {options}
                  <li className="list-group-item">
                    <input
                      type="radio"
                      name="pollOptions"
                      value={values.newOptionId}
                      checked={values.newOptionId === values.pollOptions}
                      onChange={handleChange}
                    />
                    &nbsp;
                    <input
                      type="text"
                      name="newOption"
                      id="newOption"
                      placeholder="Enter another option"
                      value={values.newOption || ''}
                      onChange={handleChange}
                      onBlur={(e) => {
                        setFieldValue('newOption', e.target.value, false);
                        setFieldValue('pollOptions', values.newOptionId, false);
                      }}
                    />
                    &nbsp;<small className="text-muted">Must not be greater than 50 characters</small>
                  </li>
                </ul>
                {errors.pollOptions && <div><small className="text-danger">{errors.pollOptions}</small></div>}
                <button type="submit" className="btn btn-primary mt-3" disabled={isDeleting || isSubmitting}>
                  {isSubmitting ? <span><Loading container"button" />Vote</span> : 'Vote'}
                </button>
              </form>
            );
          }}
        />
      )}
    </Mutation>);
};

PollOptionList.propTypes = {
  pollId: PropTypes.string.isRequired,
  pollOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    option: PropTypes.string.isRequired,
  })).isRequired,
  isDeleting: PropTypes.bool.isRequired,
};

export default PollOptionList;
