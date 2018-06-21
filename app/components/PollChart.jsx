import React, { Fragment } from 'react';
import { RadialChart, DiscreteColorLegend } from 'react-vis';

const PollChart = function PollChart() {
  const hasVotes = function hasVotes(data) {
    return !data.every(element => element[1] === 0);
  };

  const getChartData = function getChartData() {
    const chartData = this
      .props
      .options
      .map(m => [m.value, m.votes]);

    return chartData;
  };

  const data = [
    { title: 'Apples', count: 10, color: 'red' },
    { title: 'Bananas', count: 20, color: 'green' },
    { title: 'Oranges', count: 30, color: 'blue' },
  ];
  return (
    <Fragment>
      <RadialChart
        innerRadius={75}
        radius={115}
        getAngle={d => d.count}
        data={data}
        height={250}
        width={250}
        getLabel={d => d.title}
        colorType="literal"
      />
      <DiscreteColorLegend items={data.map(d => d.title)} colors={['red', 'green', 'blue']} />
    </Fragment>
  );
  // const data = this.getChartData();
  // if (this.hasVotes(data)) {
  //   data.unshift(['Value', 'Votes']);
  //   return (<div>Bob</div>);
  // }
  return (
    <div className="chart">
      <div id="noVotes">
            No Data for Chart<br />
        <span className="fa fa-pie-chart fa-4x" />
      </div>
    </div>
  );
};


export default PollChart;
