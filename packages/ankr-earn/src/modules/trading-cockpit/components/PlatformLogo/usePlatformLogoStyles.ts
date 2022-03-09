import { makeStyles } from '@material-ui/core';

export const usePlatformLogoStyles = makeStyles(() => ({
  icon: {
    display: 'block',
    width: '1em',
    height: '1em',
  },

  iconImg: {
    objectFit: 'scale-down',
    borderRadius: 8,
  },
}));
