import { makeStyles, Theme } from '@material-ui/core';

export const useLastUserRequestsStyles = makeStyles<Theme>(theme => ({
  root: {
    borderRadius: 24,
    overflow: 'hidden',
    width: '65%',
    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.down('md')]: {
      width: '60%',
    },

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 600,
    },
  },
  header: {
    padding: theme.spacing(3, 3.5, 0),
    fontSize: 16,
    fontWeight: 700,
    marginBottom: theme.spacing(1),
  },
  content: {
    position: 'relative',
    height: '100%',
  },
  thead: {
    color: theme.palette.grey[600],
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  tbody: {
    color: theme.palette.grey[800],
    position: 'absolute',
    top: 34,
    left: 0,
    width: '100%',
    height: 210,
    overflowY: 'auto',
    paddingBottom: theme.spacing(1),
  },

  row: {
    display: 'flex',
    gap: theme.spacing(1.25),
    padding: theme.spacing(1, 3.75),
  },
  item: {
    fontWeight: 400,
    lineHeight: '16.2px',

    '&:nth-child(1)': {
      width: '20%',
      minWidth: 70,
    },
    '&:nth-child(2)': {
      width: '55%',
      minWidth: 108,
    },
    '&:nth-child(3)': {
      width: '25%',
    },
  },
  loading: {
    height: theme.spacing(26),
  },
  emptyContent: {
    height: theme.spacing(26),
  },
  empty: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 400,
    color: theme.palette.grey[600],
  },
}));
