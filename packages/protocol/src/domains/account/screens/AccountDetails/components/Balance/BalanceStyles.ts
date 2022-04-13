import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { EnoughMarker } from './types';

const markerColorsMap: Record<EnoughMarker, string> = {
  [EnoughMarker.GREEN]: '#3AC090',
  [EnoughMarker.YELLOW]: '#ffff00',
  [EnoughMarker.RED]: '#D22C54',
};

export const useStyles = makeStyles<Theme, EnoughMarker>(theme => ({
  balanceRoot: {
    flex: 1,

    width: '100%',
    maxWidth: 616,
    padding: theme.spacing(2.75, 3.75, 3.75),

    borderRadius: 30,

    background: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 3, 3),
      minWidth: 240,
    },

    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: 14,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
  },
  title: {
    color: theme.palette.text.primary,
    letterSpacing: '0.01em',

    // fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '20px',
  },
  currency: {
    padding: theme.spacing(0.5, 1),

    borderRadius: 18,
    border: `1px solid ${theme.palette.action.disabledBackground}`,

    color: theme.palette.grey[600],
    letterSpacing: '0.02em',

    // fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: '16px',
  },
  withdrawButton: {
    height: 'auto',
    padding: 0,

    letterSpacing: '0.01em',

    // fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',

    '&:hover': {
      background: 'none',
    },
  },
  balance: {
    marginBottom: 38,

    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',

    fontFamily: 'TT Firs Neue',
    fontWeight: 600,
    fontSize: 45,
    lineHeight: '52px',

    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },

    [theme.breakpoints.down('xs')]: {
      marginBottom: 33,

      fontSize: 34,
      lineHeight: '40px',
    },
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '3px 9px',
  },
  marker: {
    flexShrink: 0,

    width: theme.spacing(1.5),
    height: theme.spacing(1.5),

    borderRadius: '50%',

    backgroundColor: marker => markerColorsMap[marker],

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(1.25),
      height: theme.spacing(1.25),
    },
  },
  usdtBalance: {
    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    // fontFamily: 'Inter',
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '20px',

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '0.02em',

      fontSize: 11,
      lineHeight: '16px',
    },
  },
  description: {
    color: theme.palette.grey[600],
    letterSpacing: '0.01em',

    // fontFamily: 'Inter',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '20px',

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '0.02em',

      fontSize: 11,
      lineHeight: '16px',
    },
  },
}));
