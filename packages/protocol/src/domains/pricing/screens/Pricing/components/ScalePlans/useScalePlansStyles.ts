import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const MAX_WIDTH = 1348;
export const MIDDLE_WIDTH = 700;

export const useScalePlansStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 816,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: `0 auto`,
  },
  block: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(7.5, 8),

    [theme.breakpoints.down(MIDDLE_WIDTH)]: {
      padding: theme.spacing(4),
    },

    '& + &': {
      marginTop: theme.spacing(4.5),
    },

    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
  title: {
    color: theme.palette.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing(23),
    marginBottom: theme.spacing(4.5),
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(8),
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
  fullRow: {
    width: '100%',
    padding: theme.spacing(4, 0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4, 4, 1.5, 0),
    },
  },
  row: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 150px 150px',
    padding: theme.spacing(4, 0),

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '3fr 2fr 1fr',
    },
  },
  usdColumn: {
    textAlign: 'center',
  },
  headerRow: {
    padding: theme.spacing(0, 0, 3, 0),
  },
  header: {
    color: isLightTheme(theme)
      ? theme.palette.text.secondary
      : theme.palette.grey[600],
  },
  borderBottom: {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  bold: {
    fontWeight: 700,
  },
  subrow: {
    paddingLeft: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    },
  },
  thin: {
    fontWeight: 400,
  },
}));
