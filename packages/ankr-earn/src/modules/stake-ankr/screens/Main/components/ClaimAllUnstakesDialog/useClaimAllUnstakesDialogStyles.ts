import { makeStyles } from '@material-ui/core';

export const useClaimAllUnstakesDialogStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(7, 0, 5),
    maxWidth: 700,
  },

  header: {
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
