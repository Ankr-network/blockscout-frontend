import { makeStyles } from 'tss-react/mui';

export const useWhitelistTypeTabStyles = makeStyles()(() => ({
  root: {
    height: 28,
    minHeight: 'unset',

    borderRadius: 8,

    '&:focus': {
      boxShadow:
        '0px 0px 15px 0px rgba(31, 34, 38, 0.10), 0px 0px 5px 0px rgba(31, 34, 38, 0.10)',
    },
  },
}));
