import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class PollListItem extends PureComponent {
  render() {
    return (<li className="list-group-item"><Link to={`/poll/${this.props.id}`}>{this.props.title}</Link></li>);
  }
}

class PollList extends PureComponent {
  render() {
    const listItems =
    this.props.data.pollMany.map(li => <PollListItem id={li._id} title={li.title} key={li._id} />);
    return <ul className="list-group">{listItems}</ul>;
  }
}

export default PollList;
