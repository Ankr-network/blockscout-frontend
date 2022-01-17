import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  header: {
    padding: theme.spacing(2, 0),
  },

  thead: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  row: {
    '&:last-child td, &:last-child th': { border: 0 },
  },

  cellThead: {
    backgroundColor: theme.palette.background.paper,
  },

  cell: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

    '&:last-child': {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },

  nodeCell: {
    width: '35%',
  },
  heightCell: {
    width: '20%',
  },

  countryCell: {
    width: '35%',
  },

  weightCell: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    width: '10%',
  },

  flag: {
    marginBottom: '3px',
  },
}));
