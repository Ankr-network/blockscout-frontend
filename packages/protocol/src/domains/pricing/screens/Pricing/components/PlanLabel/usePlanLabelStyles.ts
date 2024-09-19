import { makeStyles } from 'tss-react/mui';

import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

export const usePlanLabelStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    padding: theme.spacing(0.5, 2),
    borderRadius: 6,
    width: 'fit-content',
  },
  free: {
    padding: theme.spacing(0.5, 2),
    borderRadius: 6,
  },
  enterprise: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  premiumLabel: {
    background: getPremiumColorGradient(theme),
  },
  gradient: {
    color: 'white',
    fontSize: 12,
  },
}));
