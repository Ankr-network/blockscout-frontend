import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme, { hasOnClick: boolean }>(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
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
    maxWidth: '30%',
    paddingRight: theme.spacing(1),

    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      paddingRight: 0,
    },
  },
  right: {
    display: 'flex',
    width: '70%',
    gap: theme.spacing(2.5),

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  },
  endpointsList: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2.5),
    width: `calc(100% - 120px - ${theme.spacing(2.5)}px)`,

    '& > *': {
      flex: '0 0 50%',
    },

    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(4),
      width: '100%',
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
    [theme.breakpoints.down('md')]: {
      flex: '1 0 auto',
    },
  },
}));
