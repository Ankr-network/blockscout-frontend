import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme, { isMobile?: boolean }>(() => ({
  divider: {
    '&&': {
      margin: 0,
    },
  },
}));
