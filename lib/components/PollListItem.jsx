import PropTypes from 'prop-types';
import Link from 'next/link';

const PollListItem = function PollListItem({ id, title }) {
  return (
    <li className="list-group-item">
      <Link href={`/polls/${id}`}>{title}</Link>
    </li>
  );
};

PollListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PollListItem;
