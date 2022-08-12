import { makeStyles } from '@material-ui/core';

export const useClaimAllUnstakesStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(5, 4, 5),
    margin: 'auto',
    position: 'relative',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(6),
    },
  },

  total: {
    fontWeight: 600,
  },

  submit: {
    marginTop: theme.spacing(5),
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  totalTr: {
    height: 80,
  },

  tr: {
    height: 50,
    borderBottom: `1px solid ${theme.palette.background.default}`,

    '&:last-of-type': {
      borderBottom: `none`,
    },
  },

  td: {
    padding: theme.spacing(0, 2.5),
    minHeight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  left: {
    textAlign: 'left',
  },

  right: {
    textAlign: 'right',
  },

  flexRight: {
    justifyContent: 'flex-end',
    alignItems: 'right',
  },

  singleWrapper: {
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${theme.palette.background.default}`,
    borderRadius: 12,
    padding: theme.spacing(0, 2.5),
    paddingTop: 0,
    paddingBottom: 0,
  },
}));
