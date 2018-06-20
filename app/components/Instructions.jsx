import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';

const style = {
  textAlign: 'center',
  marginTop: '1em',
  color: 'gainsboro',
};

const Instructions = function Instructions(props) {
  return (
    <FelaComponent customClass="h2" style={style}>
      {props.children}
    </FelaComponent>
  );
};

Instructions.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Instructions;
