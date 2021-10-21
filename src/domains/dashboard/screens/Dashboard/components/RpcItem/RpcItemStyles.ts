import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.default,
    borderRadius: 18,
    padding: theme.spacing(3, 2),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  mainInfo: {
    minWidth: '35%',
    paddingRight: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      minWidth: '100%',
      paddingRight: 0,
    },
  },
  right: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: theme.spacing(2.5),
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      columnGap: 0,
      marginTop: theme.spacing(4),
    },
  },
  item: {
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  },
  description: {
    display: 'flex',

    '& $descriptionItem': {
      marginRight: theme.spacing(2.5),
    },
  },
  descriptionItem: {},
}));
