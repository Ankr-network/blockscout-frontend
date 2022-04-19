import { Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 3),
    borderRadius: 18,
    [theme.breakpoints.down('sm')]: {
      borderRadius: 15,
    },
  },

  title: {
    fontSize: 17,
    fontWeight: 700,
  },

  overlayLoader: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.6,
    backgroundColor: theme.palette.background.paper,
  },

  moreBtn: {
    '&&': {
      fontSize: 16,
      background: 'transparent',
      height: 24,
    },
  },

  thead: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },

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
