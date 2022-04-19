import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  row: {
    '&:last-child td, &:last-child th': { border: 0 },
  },

  cell: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    borderBottom: '1px solid rgba(224, 224, 224, .4)',
    wordBreak: 'break-word',
  },

  cellBold: {
    fontWeight: 600,
  },

  cellTopUp: {
    color: theme.palette.success.main,
  },

  cellThead: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(1),
  },
}));
