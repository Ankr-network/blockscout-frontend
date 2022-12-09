import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '28px',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    color: theme.palette.grey[600],
  },
  define: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginRight: theme.spacing(3.5),
    marginBottom: theme.spacing(1),
    '&:last-child': {
      marginRight: 0,
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: '0.01em',
    marginRight: theme.spacing(0.5),
  },
  content: {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: '0.01em',
    marginLeft: theme.spacing(0.5),
    borderRadius: 8,
    backgroundColor: theme.palette.background.default,
    padding: '2px 8px',
  },
  blockNumber: {
    width: 90,
  },
  skeleton: {
    height: 24,
    marginTop: -4,
  },
}));
