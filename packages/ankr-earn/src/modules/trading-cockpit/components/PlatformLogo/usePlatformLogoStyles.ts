import { makeStyles, Theme } from '@material-ui/core';

export const usePlatformLogoStyles = makeStyles<Theme>(theme => ({
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
