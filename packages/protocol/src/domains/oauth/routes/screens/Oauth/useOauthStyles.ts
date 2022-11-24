import { Theme, makeStyles } from '@material-ui/core';

export const useOauthStyles = makeStyles<Theme>(() => ({
  root: {
    position: 'relative',

    minHeight: 120,
  },
}));
