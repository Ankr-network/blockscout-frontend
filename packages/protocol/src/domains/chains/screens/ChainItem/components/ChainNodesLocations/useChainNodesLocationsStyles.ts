import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

export const TABLE_WIDTH = 275;

export const useChainNodesLocationsStyles = makeStyles()(theme => ({
  root: {
    marginTop: theme.spacing(2 * 3.2),
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(2 * 3.75),
  },
  head: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      gap: theme.spacing(3),
    },
  },
  title: {
    color: theme.palette.text.primary,
  },
  indicate: {
    display: 'flex',
    alignItems: 'center',
    columnGap: theme.spacing(10),
  },
  item: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '20.02px',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    columnGap: theme.spacing(2),
  },
  dot: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    borderRadius: '50%',
  },
  freeDot: {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
  premiumDot: {
    background: getPremiumColorGradient(theme),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(7.5),
    marginBottom: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  },
  nodes: {
    width: '50%',
    marginRight: theme.spacing(40),

    [theme.breakpoints.down('lg')]: {
      marginRight: theme.spacing(11),
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  empty: {
    textAlign: 'center',
    fontSize: 14,
    display: 'block',
    marginBottom: theme.spacing(4),
  },
}));
