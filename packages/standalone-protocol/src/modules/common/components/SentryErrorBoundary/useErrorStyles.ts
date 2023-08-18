import { makeStyles, Theme } from '@material-ui/core';

import { MENU_WIDTH } from 'domains/chains/screens/ChainItem/components/CrossMenu/CrossMenuStyles';

export const useErrorStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',

    width: `calc(100% - ${MENU_WIDTH}px)`,
    marginLeft: MENU_WIDTH,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 0,
    },
  },
  title: {
    fontSize: 52,
    marginBottom: theme.spacing(2),
  },
  description: {
    fontSize: 20,
    marginBottom: theme.spacing(3.5),
  },
}));
