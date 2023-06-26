import React from 'react';
import PropTypes from 'prop-types';

const style = {
  textAlign: 'center',
  marginTop: '1em',
  color: 'gray',
};

const Instructions = function Instructions({ children }) {
  return (
    <h3 style={style}>
      {children}
    </h3>
  );
};

Instructions.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Instructions;
