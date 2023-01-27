import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

import { premiumText } from 'uiKit/Theme/themeUtils';

export const useLockedTabStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2 * 0.5),
  },
  icon: {
    '&&': {
      color: '#EE6E36',
    },
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    background: premiumText,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    [theme.breakpoints.down('xl')]: {
      fontSize: 14,
    },
  },
}));
