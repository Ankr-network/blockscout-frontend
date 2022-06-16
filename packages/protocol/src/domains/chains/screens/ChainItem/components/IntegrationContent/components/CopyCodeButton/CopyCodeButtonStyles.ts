import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  copyCodeButton: {
    overflow: 'visible',

    height: 'auto',
    padding: 0,

    border: '0 none',

    transition: 'color .3s, background-color .3s',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
