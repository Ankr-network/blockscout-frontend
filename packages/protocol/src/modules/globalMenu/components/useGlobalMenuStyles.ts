import { makeStyles } from 'tss-react/mui';

export const useGlobalMenuStyles = makeStyles()(() => ({
  globalMenuRoot: {
    '&&': {
      width: 'auto',
    },
  },
  globalMenuLogo: {
    display: 'flex',
  },
}));
