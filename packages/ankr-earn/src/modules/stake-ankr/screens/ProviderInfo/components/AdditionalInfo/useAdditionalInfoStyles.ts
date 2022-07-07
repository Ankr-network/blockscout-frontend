import { makeStyles } from '@material-ui/core';

export const useAdditionalInfoStyles = makeStyles(theme => ({
  infoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: theme.spacing(0.5, 2),

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      padding: 0,
      height: 14,
    },
  },

  info: {
    minHeight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexFlow: 'row wrap',
    padding: theme.spacing(1, 0),
    borderBottom: `2px solid ${theme.palette.background.default}`,

    [theme.breakpoints.up('sm')]: {
      maxWidth: '50%',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: theme.spacing(0, 2),
      borderBottom: 'none',
      borderRight: `2px solid ${theme.palette.background.default}`,
    },

    '&:first-of-type': {
      paddingLeft: 0,
    },

    '&:last-of-type': {
      border: 'none',
      paddingRight: 0,
    },
  },

  label: {
    marginRight: theme.spacing(0.5),
  },

  value: {
    fontSize: 14,
    fontWeight: 700,
  },

  green: {
    color: theme.palette.success.main,
  },

  red: {
    color: theme.palette.error.main,
  },
}));
