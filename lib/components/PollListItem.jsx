import PropTypes from 'prop-types';
import Link from 'next/link';

const PollListItem = function PollListItem(props) {
  return (
    <li className="list-group-item">
      <Link href={`/poll/${props.id}`}>{props.title}</Link>
    </li>);
};

PollListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PollListItem;
