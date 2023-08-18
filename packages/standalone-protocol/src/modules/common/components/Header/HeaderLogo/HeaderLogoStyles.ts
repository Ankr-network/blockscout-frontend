import { makeStyles, Theme } from '@material-ui/core';

import { MENU_WIDTH } from 'domains/chains/screens/ChainItem/components/CrossMenu/CrossMenuStyles';

export const HEADER_HEIGHT = 100;

export const useStyles = makeStyles<Theme>(theme => ({
  header: {
    position: 'absolute',
    display: 'flex',
    left: MENU_WIDTH + theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      left: 0,
      alignItems: 'center',
      width: '100%',
      paddingRight: theme.spacing(1.5),
      justifyContent: 'space-between',
    },
  },
  menu: {
    display: 'none',

    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}));
