import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(2, 0),
  },
  description: {
    fontWeight: 600,
    marginBottom: theme.spacing(4),
    color: theme.palette.grey['500'],
  },

  thead: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

  row: {
    '&:last-child td, &:last-child th': { border: 0 },
  },

  cellThead: {
    background: 'inherit',
    color: theme.palette.text.primary,
    fontWeight: 700,
    paddingTop: 5,
    paddingBottom: 5,
    width: '20%',
    padding: '16px 16px 16px 0',
  },

  cell: {
    padding: '16px 16px 16px 0',
    width: '20%',
    fontSize: 16,
  },

  nodeCell: {
    width: '40%',
    fontSize: 16,
    padding: '16px 16px 16px 0',
  },

  countryCell: {
    width: '40%',
    fontSize: 16,
    padding: '16px 16px 16px 0',
  },

  flag: {
    marginBottom: '3px',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: 10,
  },
  green: {
    background: theme.palette.success.main,
  },
  red: {
    background: theme.palette.error.main,
  },
}));
