import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderRadius: 18,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 15,
    },
  },

  thead: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  row: {
    '&:last-child td, &:last-child th': { border: 0 },
  },

  theadText: {
    fontSize: 12,
  },

  cell: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '20%',
    borderBottom: '1px solid rgba(224, 224, 224, .4)',
  },

  cellThead: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(1),
  },

  countryCell: {
    width: '30%',
  },

  flag: {
    marginBottom: '3px',
  },

  logo: {
    width: 16,
    height: 16,
    verticalAlign: 'text-bottom',
    marginRight: theme.spacing(1),
  },
}));
