import { makeStyles } from 'tss-react/mui';

import { dialogHeaderGradient } from 'uiKit/Theme/themeUtils';

export const useFailedBannerStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    maxHeight: 280,

    background: dialogHeaderGradient,
  },
}));
