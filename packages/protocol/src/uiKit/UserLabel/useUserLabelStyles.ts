import { makeStyles } from 'tss-react/mui';

import { isLightTheme, getPremiumColorGradient } from 'uiKit/Theme/themeUtils';
import { COLOR_PURPLE } from 'uiKit/Theme/const';

export const useUserLabelStyles = makeStyles()(theme => ({
  root: {
    height: 24,
    display: 'flex',
    alignItems: 'center',
  },
  free: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0.5, 2),
    borderRadius: 8,

    [theme.breakpoints.down('md')]: {
      backgroundColor: theme.palette.background.default,
    },
  },
  premium: {
    color: theme.palette.common.white,
    background: getPremiumColorGradient(theme),
    padding: theme.spacing(0.5, 2),
    borderRadius: 8,
  },
  transition: {
    background: theme.palette.grey[100],

    color: theme.palette.grey[600],
  },
  enterprise: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1.5),
    padding: theme.spacing(0, 2, 0, 1),
    color: isLightTheme(theme)
      ? theme.palette.common.white
      : theme.palette.common.black,
    borderRadius: 8,
    background: isLightTheme(theme)
      ? theme.palette.grey[900]
      : theme.palette.common.white,
  },
  enterpriseIcon: {
    color: 'inherit',
    width: 12,
    height: 12,
  },
  skeleton: {
    borderRadius: 8,
  },
  package: {
    color: COLOR_PURPLE,
    backgroundColor: '#F3E5FA',
  },
  deal: {
    color: '#5856D6',
    backgroundColor: '#E6E6F9',
  },
  small: {
    padding: theme.spacing(0.5, 1),
    height: 20,
    borderRadius: 8,
  },
  large: {
    padding: theme.spacing(1, 3),
    borderRadius: 12,
  },
}));
