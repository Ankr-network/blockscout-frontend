import { makeStyles } from 'tss-react/mui';

import { premiumBackground } from 'uiKit/Theme/themeUtils';

export const useHeaderStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    background: premiumBackground,
  },
  logo: {
    display: 'block',

    width: 280,
    height: 280,
  },
}));
