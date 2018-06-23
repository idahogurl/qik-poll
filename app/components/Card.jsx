import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';

const style = {
  marginTop: '1em',
};

const Card = function Card(props) {
  return (
    <FelaComponent customClass="card" style={style}>
      {props.children}
    </FelaComponent>
  );
};

Card.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Card;
