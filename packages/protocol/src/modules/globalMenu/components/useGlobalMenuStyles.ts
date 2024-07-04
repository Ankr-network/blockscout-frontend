import { OpenButtonId } from '@ankr.com/cross-navigation';
import { makeStyles } from 'tss-react/mui';

export const useGlobalMenuStyles = makeStyles()(() => ({
  globalMenuRoot: {
    '&&': {
      width: 'auto',

      '& svg': {
        width: 'auto',
      },

      [`& #${OpenButtonId}`]: {
        width: 28,
        height: 28,

        '& svg': {
          width: 28,
          height: 28,
        },
      },
    },
  },
  globalMenuLogo: {
    display: 'flex',
  },
}));
