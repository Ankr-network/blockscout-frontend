import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
  copyCodeButton: {
    overflow: 'visible',
    height: 'auto',
    padding: 0,

    '&&': {
      backgroundColor: 'transparent',
      border: '0 none',
      boxShadow: 'none',

      '& svg': {
        fontSize: 24,
      },
    },

    transition: 'color .3s, background-color .3s',

    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
