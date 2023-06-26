import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import palette from 'google-palette';
import { RadialChart, DiscreteColorLegend } from 'react-vis';

const PollChart = function PollChart(props) {
  const hasVotes = function hasVotes(data) {
    return data.some((d) => d.votes > 0);
  };

  const getChartData = function getChartData(options, colors) {
    return options.map((c, index) => ({ title: `${c.option} (${c.votes})`, count: c.votes, color: colors[index] }));
  };

  if (hasVotes(props.options)) {
    const colors = palette('tol-rainbow', props.options.length).map((c) => `#${c}`);

    const data = getChartData(props.options, colors);
    return (
      <>
        <RadialChart
          innerRadius={75}
          radius={115}
          getAngle={(d) => d.count}
          data={data}
          height={250}
          width={250}
          getLabel={(d) => d.title}
          colorType="literal"
        />
        <DiscreteColorLegend items={data.map((d) => d.title)} colors={colors} />
      </>
    );
  }

  return (
    <div className="chart">
      <div id="noVotes">
        No Data for Chart
        <br />
        <span className="fa fa-pie-chart fa-4x" />
      </div>
    </div>
  );
};

PollChart.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    option: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  })).isRequired,
};

export default PollChart;
