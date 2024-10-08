import { makeStyles } from 'tss-react/mui';

import { premiumTextStyles } from 'uiKit/Theme/themeUtils';

export const useChainTypeSelectorWithSubchainsStyles = makeStyles()(theme => ({
  parentFormControl: {
    marginTop: theme.spacing(2),
  },
  childrenWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  childSelector: {
    paddingTop: theme.spacing(),
    marginLeft: theme.spacing(2),
  },
  chainCheckbox: {
    input: {
      width: '60px',
      height: '40px',
      left: '-28px',
      top: '-8px',
    },
  },
  hasPremiumColor: {
    ...premiumTextStyles,
  },
}));
