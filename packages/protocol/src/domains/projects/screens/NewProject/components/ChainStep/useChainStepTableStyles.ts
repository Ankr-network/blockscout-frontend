import { makeStyles } from 'tss-react/mui';

import { premiumTextStyles } from 'uiKit/Theme/themeUtils';

export const useChainStepTableStyles = makeStyles()(theme => ({
  inactive: {
    opacity: 0.5,
  },
  premiumLabelWrapper: {
    backgroundColor: theme.palette.background.default,
    borderRadius: 12,
    display: 'inline-block',
    padding: theme.spacing(1.5, 4),
  },
  premiumLabelText: {
    ...premiumTextStyles,
  },
}));
