import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent } from 'react-fela';

const style = {
  border: 0,
  color: 'blue',
  borderBottom: '1px solid blue',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  padding: 0,
  marginLeft: '.5em',
};

const HyperlinkButton = function HyperlinkButton(props) {
  return (
    <FelaComponent
      style={style}
      render={({ className }) => (
        <button className={className} onClick={props.onClick}>{props.children}</button>)}
    />
  );
};

HyperlinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default HyperlinkButton;
