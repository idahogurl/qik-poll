import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';

const style = {
  textAlign: 'center',
  marginTop: '1em',
  color: 'gray',
};

const Instructions = function Instructions(props) {
  return (
    <FelaComponent customClass="h3" style={style} render="h2">
      {props.children}
    </FelaComponent>
  );
};

Instructions.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Instructions;
