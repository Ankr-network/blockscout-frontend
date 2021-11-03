import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BREAKPOINTS } from 'modules/themes/const';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },
  block: {
    [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
      width: '49%',
    },

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.down(BREAKPOINTS.values.WXGAPlus)]: {
        marginBottom: '2%',
      },
    },
  },
}));
