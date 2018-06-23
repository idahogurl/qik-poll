import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';

const style = {
  border: 0,
  color: 'blue',
  textDecoration: 'underline',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  margin: 0,
};

const HyperlinkButton = function HyperlinkButton(props) {
  return (
    <FelaComponent render={() => (<button style={style} onClick={props.onClick}>{props.children}</button>)} />
  );
};

HyperlinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default HyperlinkButton;
