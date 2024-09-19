import { alpha } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { getPremiumColorGradient } from 'uiKit/Theme/themeUtils';

export const useLocationsTableStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
  },
  title: {
    color: theme.palette.text.secondary,
    display: 'block',
    fontSize: 14,
    lineHeight: '20.02px',
    fontWeight: 400,
    paddingBottom: theme.spacing(3),
    marginBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  row: {
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    marginBottom: theme.spacing(4),
    paddingRight: theme.spacing(3),
  },
  continent: {
    width: '50%',
  },
  indicate: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    width: '50%',
  },
  free: {
    height: theme.spacing(2),
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
    borderRadius: theme.spacing(0.5),
  },
  premium: {
    height: theme.spacing(2),
    background: getPremiumColorGradient(theme),
    borderRadius: theme.spacing(0.5),
  },
  premiumItem: {
    display: 'flex',
    alignItems: 'center',
  },
  count: {
    fontSize: 12,
    marginLeft: theme.spacing(1),
    background: getPremiumColorGradient(theme),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitBoxDecorationBreak: 'clone',
  },
}));
