import React from 'react';
import Spinner from 'react-spinkit';
import { FelaComponent } from 'react-fela';

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '1 0 auto',
};

const Loader = function Loader() {
  return (
    <FelaComponent style={style}>
      <Spinner name="line-scale-party" />
    </FelaComponent>
  );
};
export default Loader;
