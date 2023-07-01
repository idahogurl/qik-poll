import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { v4 as uuid } from 'uuid';

import { useMutation } from '@apollo/client';

import VOTE_MUTATION from '../graphql/Vote.gql';

import PollOption from './PollOption';
import Spinner from './Spinner';
import ErrorNotification from './ErrorNotification';

const PollOptionList = function PollOptionList({
  pollId, pollOptions, isDeleting, refetch,
}) {
  // TODO: need refetch
  const [voteMutation, { error }] = useMutation(VOTE_MUTATION);
  return (
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
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        voteMutation({
          variables: {
            id: values.pollOptions,
            input: { pollId, option: values.newOption },
          },
        }).then(() => {
          resetForm();
          refetch();
        }).catch(() => {
          setSubmitting(false);
        });
      }}
    >
      {({
        values,
        errors,
        handleChange,
        setFieldValue,
        handleSubmit,
        isSubmitting,
      }) => {
        const options = pollOptions.map((li) => (
          <PollOption
            id={li.id}
            title={li.option}
            key={li.id}
            onChange={handleChange}
            checked={li.id === values.pollOptions}
          />
        ));

        return (
          <form onSubmit={handleSubmit} className="px-4 py-3">
            {error && <ErrorNotification />}
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
                {' '}
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
                <div><small className="text-muted">Must not be greater than 50 characters</small></div>
              </li>
            </ul>
            {errors.pollOptions && <div><small className="text-danger">{errors.pollOptions}</small></div>}
            <button type="submit" className="btn btn-primary mt-3" disabled={isDeleting || isSubmitting}>
              {isSubmitting ? (
                <span>
                  <Spinner />
                  Vote
                </span>
              ) : 'Vote'}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

PollOptionList.propTypes = {
  pollId: PropTypes.string.isRequired,
  pollOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    option: PropTypes.string.isRequired,
  })).isRequired,
  isDeleting: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default PollOptionList;
