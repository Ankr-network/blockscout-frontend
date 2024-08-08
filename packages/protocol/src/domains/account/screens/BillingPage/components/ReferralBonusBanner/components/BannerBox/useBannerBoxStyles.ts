import { makeStyles } from 'tss-react/mui';

import background from '../../assets/background.png';
import coins from '../../assets/coins.png';

export const useBannerBoxStyles = makeStyles()(theme => ({
  root: {
    height: 120,
    padding: theme.spacing(6, 8),

    borderRadius: 20,

    background: `
      url(${coins}) right / auto 100% no-repeat,
      url(${background}) center / auto 100%,
      linear-gradient(0, rgba(255, 255, 255, 0.24)0%, rgba(255, 255, 255, 0.24)100%)
    `,
  },
}));
