import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { getPoll } from '../graphql/polls.gql';
import Loader from './Loader';
import onError from '../utils/onError';
import PollOption from './PollOption';
import PollChart from './PollChart';

// import FacebookProvider, { ShareButton } from 'react-facebook';

const PollViewer = function PollViewer(props) {
  const { match: { params: { id } } } = props;

  const variables = { id };

  return (
    <Query query={getPoll} variables={variables}>
      {({ loading, error, data }) => {
      if (loading) return <Loader />;

      if (error) {
          onError(error);
      }

      const { poll } = data;

      const options = poll.pollOptions ? poll.pollOptions.map(li =>
        <PollOption id={li.id} title={li.option} key={li.id} />) :
          [];

      const title = (<input
        type="text"
        name="newOption"
        id="newOption"
        placeholder="Enter another option"
        maxLength="50"
      />);

      const newOption = <PollOption id="0" title={title} key="0" />;
      options.push(newOption);

      return (
        <div className="m-3">
          <div id="fb-root" />
          <div className="row">
            <div className="col-sm-6">
              <h1 className="h2">{poll.prompt}</h1>

              <input type="hidden" name="id" value={id} />
              <ul className="list-group">{options}</ul>
              <button className="btn btn-primary mt-3">Vote</button>
              <div />
            </div>
            <div className="col-sm-6">
              <button className="btn btn-danger">Delete</button>
              <PollChart options={poll.pollOptions} />
            </div>
          </div>
        </div>
      );
    }}
    </Query>);
};

PollViewer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PollViewer;
