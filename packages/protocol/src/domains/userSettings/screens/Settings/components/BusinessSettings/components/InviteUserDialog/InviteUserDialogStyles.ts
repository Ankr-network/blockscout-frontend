import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useInviteUserDialogStyles = makeStyles()(theme => ({
  paperRoot: {
    margin: 0,
    width: '100%',

    maxWidth: 600,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fill: theme.palette.common.black,

    '& button': {
      '&:hover': {
        backgroundColor: theme.palette.grey[isLightTheme(theme) ? 200 : 800],
      },
    },
    '& svg': {
      color: theme.palette.common.black,
    },
  },
  root: {
    marginTop: theme.spacing(10),
    margin: '0 auto',

    [theme.breakpoints.down('sm')]: {
      width: 'unset',
    },
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(10),
    color: theme.palette.common.black,

    fontSize: 28,
  },
}));
