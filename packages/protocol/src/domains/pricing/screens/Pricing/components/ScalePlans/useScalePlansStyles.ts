import { makeStyles } from 'tss-react/mui';

import { getPremiumColorGradient, isLightTheme } from 'uiKit/Theme/themeUtils';

export const MAX_WIDTH = 1348;
export const MIDDLE_WIDTH = 700;

export const useScalePlansStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.spacing(30),
    backgroundColor: theme.palette.grey[100],
    borderRadius: 20,
    padding: theme.spacing(10),

    [theme.breakpoints.down(MAX_WIDTH)]: {
      marginTop: theme.spacing(20),
    },

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      padding: theme.spacing(6),
      marginTop: theme.spacing(10),
      borderRadius: 20,
    },
  },
  title: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(4),
  },
  pay: {
    width: 131,
    color: theme.palette.common.white,
    background: getPremiumColorGradient(theme),
    borderRadius: 5,
    padding: theme.spacing(0.5, 1.25, 0.5, 1.5),
    marginBottom: theme.spacing(4),
  },
  description: {
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down(MAX_WIDTH)]: {
      flexDirection: 'column',
      marginTop: 0,
    },
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',

    [theme.breakpoints.down(MAX_WIDTH)]: {
      flexDirection: 'row',
      margin: theme.spacing(8, 0),
    },

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      margin: theme.spacing(5, 0),
    },
  },
  item: {
    color: theme.palette.text.primary,
    display: 'flex',
    marginBottom: theme.spacing(4),
    alignItems: 'center',

    [theme.breakpoints.down(MAX_WIDTH)]: {
      width: '50%',
    },

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      width: '100%',
    },
  },
  check: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: '50%',
    marginRight: theme.spacing(2),

    '& svg': {
      color: theme.palette.primary.main,
    },
  },
}));
