import { createComponent } from 'react-fela';
import { mapValueToMediaQuery } from 'fela-tools';

const NavBarImage = function NavBarImage({ width, widths }) {
  return {
    width,
    marginLeft: '.5em',
    marginRight: '.5em',
    extend: [
      mapValueToMediaQuery(widths, value => ({ width: value })),
    ],
  };
};


export default createComponent(NavBarImage, 'img', ['src', 'alt']);
