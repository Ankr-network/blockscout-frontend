import { makeStyles } from 'tss-react/mui';

import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

export const MAX_WIDTH = 1348;
export const MIDDLE_WIDTH = 700;

export const useScalePlansStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.spacing(30),
    backgroundColor: theme.palette.grey[100],
    borderRadius: 60,
    padding: theme.spacing(10),
    marginBottom: theme.spacing(30),

    [theme.breakpoints.down(MAX_WIDTH)]: {
      marginTop: theme.spacing(20),
    },

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      padding: theme.spacing(6),
      marginTop: theme.spacing(10),
      borderRadius: 30,
    },
  },
  title: {
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(5),

    [theme.breakpoints.down(MAX_WIDTH)]: {
      fontSize: 35,
    },

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      fontSize: 31,
    },
  },
  intro: {
    color: theme.palette.text.primary,
    diaply: 'inline-block',
    lineHeight: '34px',

    [theme.breakpoints.down(MAX_WIDTH)]: {
      fontsize: 28,
    },

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      fontSize: 24,
    },
  },
  pay: {
    float: 'left',
    color: theme.palette.common.white,
    fontWeight: 500,
    fontSize: 21,
    lineHeight: '34px',
    background: getPremiumColorGradient(theme),
    marginRight: theme.spacing(3),
    borderRadius: 13.5,
    padding: theme.spacing(0, 3),
  },
  content: {
    marginTop: theme.spacing(12),
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
    backgroundColor: theme.palette.primary.light,
    width: theme.spacing(6),
    height: theme.spacing(6),
    borderRadius: '50%',
    marginRight: theme.spacing(2),

    '& svg': {
      color: theme.palette.primary.main,
    },
  },
}));
