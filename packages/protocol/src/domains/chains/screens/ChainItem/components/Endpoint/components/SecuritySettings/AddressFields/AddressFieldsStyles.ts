import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles<Theme>(theme => ({
  title: {
    fontWeight: 700,
    marginTop: theme.spacing(3.5),
  },

  domainRows: {
    marginTop: theme.spacing(3),
  },
  domainRow: {
    display: 'inline-grid',
    width: '100%',
    alignItems: 'center',
    gridTemplateColumns: '1fr auto',

    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
  deleteButton: {
    padding: 0,
    margin: '2px 0',

    '&:hover ': {
      background: '#F2F5FA',

      '& $icon': {
        fill: theme.palette.primary.main,
      },
    },
  },
  icon: {
    width: 14,

    fill: theme.palette.grey[400],
  },
}));
