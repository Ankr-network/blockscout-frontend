import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme, { hasOnClick: boolean }>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },

    '&:hover': {
      boxShadow: ({ hasOnClick }) =>
        hasOnClick
          ? '0px 0px 15px rgba(31, 34, 38, 0.05), 0px 3px 50px rgba(31, 34, 38, 0.15)'
          : 'none',
    },

    cursor: ({ hasOnClick }) => (hasOnClick ? 'pointer' : 'default'),
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
    display: 'flex',
    justifyContent: 'flex-end',
    width: '65%',

    '& > *': {
      marginLeft: theme.spacing(2.5),
      flex: 1 / 2,
    },

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(4),
      width: '100%',
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
  moreBtn: {
    flex: '0 0 120px',
    borderRadius: 8,
    '&:hover': {
      color: theme.palette.text.primary,
    },
    [theme.breakpoints.down('sm')]: {
      flex: '1 0 auto',
    }
  },
}));
