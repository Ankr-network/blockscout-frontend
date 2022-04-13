import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  theadText: {
    fontSize: 12,
  },

  theadClickable: {
    cursor: 'pointer',
  },

  cell: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),
    width: '20%',
    borderBottom: '1px solid rgba(224, 224, 224, .4)',
    wordBreak: 'break-word',
  },

  cellThead: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(1),
  },
}));
