import { makeStyles } from 'tss-react/mui';

export const useChainCardShadowStyles = makeStyles()(() => ({
  root: {
    '&:hover': {
      boxShadow:
        '0px 2px 5px 0px rgba(31, 34, 38, 0.10), 0px 3px 15px 0px rgba(31, 34, 38, 0.10)',
    },
  },
}));
