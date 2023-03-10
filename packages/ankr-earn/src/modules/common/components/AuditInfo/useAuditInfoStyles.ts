import { makeStyles } from '@material-ui/core';

export const useAuditInfoStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridAutoColumns: 'max-content',
    gridAutoFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0 0.5em',

    fontSize: 13,
    fontWeight: 400,
    lineHeight: 1,
    color: theme.palette.text.secondary,
  },

  item: {
    '&&:hover': {
      color: theme.palette.primary.main,
    },
  },

  itemIcon: {
    width: '1em',
    height: '1em',
    marginLeft: '0.2em',
    fontSize: '1.24em',
  },
}));
