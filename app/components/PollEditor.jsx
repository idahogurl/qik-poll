import React from 'react';
import { Mutation, Query } from 'react-apollo';
import { Formik } from 'formik';
import { createPoll, getPolls } from '../graphql/polls.gql';

const PollEditor = function PollEditor(props) {
  const { window } = global;
  const currentUser = JSON.parse(window.sessionStorage.getItem('currentUser'));

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
          prompt: '',
          options: '',
        }}
        validate={(values) => {
          // same as above, but feel free to move this into a class method now.
          const errors = {};
          // if (!values.email) {
          //   errors.email = 'Required';
          // } else if (
          //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          // ) {
          //   errors.email = 'Invalid email address';
          // }
          return errors;
        }}
        onSubmit={(
          values,
          { setSubmitting, setErrors /* setValues and other goodies */ },
        ) => {
          createMutation({ variables: { ...values, userId: currentUser.id } });
          // LoginToMyApp(values).then(
          //   (user) => {
          //     setSubmitting(false);
          //     // do whatevs...
          //     // props.updateUser(user)
          //   },
          //   (errors) => {
          //     setSubmitting(false);
          //     // Maybe transform your API's errors into the same shape as Formik's
          //     setErrors(transformMyApiErrors(errors));
          //   },
          // );
        }}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className="container-fluid">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label>Question<input
                  type="text"
                  name="prompt"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.prompt}
                  className="form-control w-100"
                />
                </label>
              </div>
              {touched.prompt && errors.prompt && <div>{errors.prompt}</div>}
              <div className="form-group">
                <label>
              Options (seperated by line):
                  <textarea
                    name="options"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.options}
                    className="form-control"
                  />
                </label>
              </div>
              {touched.options && errors.options && <div>{errors.options}</div>}
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Create
              </button>
            </form>
          </div>
        )}
      />)}
    </Mutation>);
};

export default PollEditor;
