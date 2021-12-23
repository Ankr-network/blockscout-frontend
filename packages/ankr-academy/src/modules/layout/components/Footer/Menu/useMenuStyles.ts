import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

export const useMenuStyles = makeStyles<Theme>(theme => ({
  component: {
    paddingTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(4),
      marginBottom: 60,
    },
  },

  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column',
    },
  },

  top: {
    width: '50%',
    paddingRight: theme.spacing(13),
    [theme.breakpoints.down('lg')]: {
      width: '100%',
      paddingRight: 0,
    },
  },

  partners: {
    marginBottom: theme.spacing(8),
  },

  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: '15px',
    width: '50%',
    margin: 0,
    padding: 0,
    listStyle: 'none',

    [theme.breakpoints.down('lg')]: {
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      gap: 0,
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      marginTop: theme.spacing(1),
    },
  },

  item: {
    width: '33%',
    [theme.breakpoints.down('xs')]: {
      width: '49%',
      marginTop: theme.spacing(4),
    },
  },

  cryptoWidget: {
    display: 'inline-block',
    minWidth: 500,
    minHeight: 100,
    marginLeft: -16,
    marginRight: -16,
    [theme.breakpoints.down('lg')]: {
      marginBottom: theme.spacing(4),
      minWidth: '100%',
      marginLeft: 0,
      marginRight: 0,
    },
  },
}));
