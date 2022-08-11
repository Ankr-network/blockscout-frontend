import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme => ({
  root: {
    height: 258,
    flex: '1 0 30%',
    minWidth: 268,
    backgroundColor: 'transparent',
    [theme.breakpoints.down('xs')]: {
      height: 248,
      width: 280,
      flex: '1 0 auto',
    },
    '&:hover': {
      '& $container': {
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.main,

        transform: 'rotate3d(0, 1, 0, 180deg)',
      },

      '& $fullDescription': {
        display: 'block',
        transform: 'rotate3d(0, 1, 0, 180deg)',
      },

      '& $title': {
        display: 'none',
      },

      '& $plusIcon': {
        display: 'none',
      },
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    flex: '1 0 30%',
    padding: theme.spacing(3, 3.5),
    borderRadius: theme.spacing(3.5),
    backgroundColor: theme.palette.common.white,
    overflow: 'hidden',
    transition: 'transform 375ms, background-color 375ms',
    minWidth: 248,
    [theme.breakpoints.down('xs')]: {
      height: 248,
      width: 280,
      flex: '1 0 auto',
    },
  },
  title: {
    fontSize: 20,
  },
  plusIcon: {
    alignSelf: 'flex-end',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  fullDescription: {
    display: 'none',
    color: theme.palette.common.white,
    transition: 'transform 375ms',
    userSelect: 'none',
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
}));
