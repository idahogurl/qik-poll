import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';

const Loading = function Loading(props) {
  const { element } = props;

  const style = element === 'page' ? {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '1 0 auto',
    marginTop: '1em',
    height: '50%',
  } : {};

  return (
    <FelaComponent style={style} render={element === 'page' ? 'div' : 'span'}>
      <i className={`fa ${element === 'page' ? 'fa-4x' : null} fa-spinner fa-spin`} />
    </FelaComponent>
  );
};

Loading.propTypes = {
  element: PropTypes.string.isRequired,
};

export default Loading;
