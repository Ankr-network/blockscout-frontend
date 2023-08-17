import { makeStyles } from 'tss-react/mui';

export const useSignupMenuStyles = makeStyles()(() => ({
  paper: {
    width: 400,
    borderRadius: 14,
    boxShadow:
      '0px 3px 15px 0px rgba(31, 34, 38, 0.10), 0px 2px 5px 0px rgba(31, 34, 38, 0.10)',
  },
  menu: {
    padding: 0,

    '& li:active': {
      transform: `translateY(0)`,
    },
  },
}));
