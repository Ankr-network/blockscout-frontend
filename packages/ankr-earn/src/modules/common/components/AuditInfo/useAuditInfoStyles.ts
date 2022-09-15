import { makeStyles } from '@material-ui/core';

export const useAuditInfoStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridAutoColumns: 'max-content',
    gridAutoFlow: 'column',
    justifyContent: 'center',
    gap: '0 0.5em',
    marginTop: theme.spacing(4),

    fontSize: 13,
    fontWeight: 400,
  },

  item: {
    '&&:hover': {
      color: theme.palette.primary.main,
    },
  },

  itemIcon: {
    marginLeft: '0.2em',
    fontSize: '1.24em',
  },
}));
