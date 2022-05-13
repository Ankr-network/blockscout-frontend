import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme, boolean>(theme => ({
  detailsRoot: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: isPremium => (isPremium ? 'nowrap' : 'wrap'),
    gap: '3px 9px',

    color: theme.palette.grey[600],

    letterSpacing: '0.01em',

    // fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: '20px',

    [theme.breakpoints.down('xs')]: {
      letterSpacing: '0.02em',

      fontSize: 11,
      lineHeight: '16px',
    },
  },
  marker: {
    marginTop: 2,
  },
  description: {
    fontWeight: 700,
  },
  extraDescription: {
    fontWeight: 400,
  },
  descriptions: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
