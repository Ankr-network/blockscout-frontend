import { makeStyles } from 'tss-react/mui';

export const useInputFieldStyles = makeStyles()(() => ({
  root: {
    '& div': {
      minHeight: 52,
      height: 'auto !important',
    },

    '& > p': {
      marginLeft: 0,
      marginRight: 0,
    },

    '& textarea': {
      minHeight: '95px !important',
    },
  },
}));
