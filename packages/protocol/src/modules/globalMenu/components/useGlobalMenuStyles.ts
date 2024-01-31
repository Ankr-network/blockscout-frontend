import { makeStyles } from 'tss-react/mui';

export const useGlobalMenuStyles = makeStyles()(() => ({
  globalMenuRoot: {
    '&&': {
      width: 'auto',

      '& svg': {
        width: 'auto',
      },
    },
  },
  globalMenuLogo: {
    display: 'flex',
  },
}));
