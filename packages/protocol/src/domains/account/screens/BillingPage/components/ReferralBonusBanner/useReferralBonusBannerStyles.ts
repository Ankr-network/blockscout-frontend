import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

const name = 'ReferralBonusBanner';

export const useReferralBonusBannerStyles = makeStyles({ name })(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),

    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.background.default,
  },
  description: {
    whiteSpace: 'pre-wrap',

    [theme.breakpoints.down('sm')]: {
      whiteSpace: 'normal',
    },
  },
}));
