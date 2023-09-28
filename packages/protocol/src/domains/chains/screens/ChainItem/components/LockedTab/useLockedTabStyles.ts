import { makeStyles } from 'tss-react/mui';

import { premiumText } from 'uiKit/Theme/themeUtils';

export const useLockedTabStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  icon: {
    '&&': {
      color: '#EE6E36',
    },
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    background: premiumText,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
}));
