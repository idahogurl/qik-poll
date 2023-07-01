import PropTypes from 'prop-types';
import { FacebookShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

export default function FbSharePollButton({ pollId }) {
  return (
    <FacebookShareButton
      url={`https://qik-poll.vercel.app/poll/${pollId}`}
    >
      <span className="btn btn-primary">
        <FontAwesomeIcon icon={faFacebookF} size="1x" />
        <span className="ml-3">Share</span>
      </span>
    </FacebookShareButton>
  );
}

FbSharePollButton.propTypes = {
  pollId: PropTypes.string.isRequired,
};
