import PropTypes from 'prop-types';
import palette from 'google-palette';
import { RadialChart, DiscreteColorLegend } from 'react-vis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPieChart } from '@fortawesome/free-solid-svg-icons';

const hasVotes = function hasVotes(data) {
  return data.some((d) => d.votes > 0);
};

const PollChart = function PollChart({ options }) {
  if (hasVotes(options)) {
    const colors = palette('tol-rainbow', options.length).map((c) => `#${c}`);

    const data = options.map((c, index) => ({ title: `${c.option} (${c.votes})`, count: c.votes, color: colors[index] }));
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
        <FontAwesomeIcon icon={faPieChart} size="4x" />
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
