import { makeStyles } from 'tss-react/mui';

export const useChainTypeTabStyles = makeStyles()(() => ({
  root: {
    '&': {
      height: 30,
      minHeight: 'unset',
      boxShadow: 'none',

      borderRadius: 10,

      fontSize: 14,
      fontWeight: 500,
      lineHeight: '143%',
    },
  },
}));
