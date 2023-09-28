import { makeStyles } from 'tss-react/mui';

export const useChainTypeTabStyles = makeStyles()(() => ({
  root: {
    '&': {
      height: 28,
      minHeight: 'unset',
      boxShadow: 'none',

      borderRadius: 8,

      fontSize: 14,
      fontWeight: 500,
      lineHeight: '143%',
    },
  },
}));
