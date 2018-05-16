import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import FacebookProvider, { ShareButton } from 'react-facebook';

// google.load("visualization", "1", {packages: ["corechart"]});

// class PollViewer extends PureComponent {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return <div><Poll /></div>;
//   }
// }

class PollOption extends PureComponent {
  render() {
    return (
      <li className="list-group-item">
        <input type="radio" name="pollOptions" value={this.props.id} /> {' '}
        {this.props.title}
      </li>
    );
  }
}

PollOption.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

class PollViewer extends PureComponent {
  render() {
    return <div>Loading ...</div>;
    const options = this
      .props
      .options
      .map(li => <PollOption id={li._id} title={li.value} key={li._id} />);

    const title = (<input
      type="text"
      name="newOption"
      id="newOption"
      placeholder="Enter another option"
      maxLength="50"
    />);

    const newOption = <PollOption id={0} title={title} />;
    options.push(newOption);

    return (
      <div>
        <div id="fb-root" />
        <div className="row">
          <div className="col-sm-6">
            <h2>{this.props.title}</h2>

            <input type="hidden" name="_id" value={this.props._id} />
            <ul className="list-group">{options}</ul>
            <button className="btn btn-primary" style={{ margin: 10 }}>Vote</button>
            <div />
          </div>
          <div className="col-sm-6">
            <button className="btn btn-danger">Delete</button>
            <Chart options={this.props.options} />
          </div>
        </div>
      </div>
    );
  }
}

class Chart extends PureComponent {
  constructor(props) {
    super();
    this.props = props;
  }

  hasVotes(data) {
    return !data.every(element => element[1] === 0);
  }

  getChartData() {
    const chartData = this
      .props
      .options
      .map(m => [m.value, m.votes]);

    return chartData;
  }

  render() {
    const data = this.getChartData();
    if (this.hasVotes(data)) {
      data.unshift(['Value', 'Votes']);
      return (<div>Bob</div>);
    }
    return (
      <div className="chart">
        <div id="noVotes">
            No Data for Chart<br />
          <span className="fa fa-pie-chart fa-4x" />
        </div>
      </div>
    );
  }
}

// class GooglePieChart extends React.Component {
//   constructor(props) {
//     super();
//     this.props = props;
//   }
//
//   componentDidMount() {
//     this.drawChart();
//   }
//   componentDidUpdate() {
//     this.drawChart();
//   }
//
//   drawChart() {
//     var data = google.visualization.arrayToDataTable(this.props.data);
//
//     var options = {
//       title: "Votes Breakdown"
//     };
//
//     var chart = new google.visualization.PieChart(document.getElementById(this.props.chartName));
//
//     chart.draw(data, options);
//   }
//
//   render() {
//     return <div id={this.props.chartName}/>;
//   }
// }
// const getPoll = gql`query getPoll($id: MongoID!) {
//   pollById(_id: $id) {
//     title
//   }
// }`

// export default graphql(getPolls)(PollViewer)
export default PollViewer;
