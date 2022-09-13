import { Theme, makeStyles } from '@material-ui/core';

export const useHeaderStyles = makeStyles<Theme>(theme => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: theme.spacing(0, 3.5),
  },
  title: {
    color: theme.palette.common.white,

    fontWeight: 700,
    fontSize: theme.spacing(2),
    lineHeight: `${theme.spacing(3)}px`,
  },
  clearButton: {
    overflow: 'visible',

    height: 'auto',
    padding: 0,
    minWidth: 'auto',

    border: '0 none',

    transition: 'color .3s, background-color .3s',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
