import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    paddingRight: theme.spacing(0.5),

    [theme.breakpoints.down('md')]: {
      paddingRight: 0,
    },
  },

  table: {
    background: theme.palette.background.paper,
    borderRadius: 0,
  },
  cellThead: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0, 0, 1.5),
  },

  thead: {
    '& $cellThead:last-child': {
      textAlign: 'right',
    },
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
  row: {
    '& td': { border: 0 },
  },
  requests: {
    fontWeight: 600,
  },
  selected: {
    '& h6': {
      color: theme.palette.primary.main,
    },
  },

  country: {
    display: 'flex',
  },
  firstCell: {
    display: 'inline-flex',
    alignItems: 'center',
    minWidth: '120px',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
  secondCell: {
    minWidth: '40%',
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    textAlign: 'right',
    textTransform: 'uppercase',
  },
  body: {
    '& $row:first-child td': {
      paddingTop: theme.spacing(1.5),
    },
  },
}));
