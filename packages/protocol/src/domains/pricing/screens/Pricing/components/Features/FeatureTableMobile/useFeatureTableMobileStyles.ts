import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { premiumColor } from 'uiKit/Theme/themeUtils';

export const useFeatureTableMobileStyles = makeStyles()((theme: Theme) => ({
  title: {
    fontSize: 24,
    lineHeight: '27.6px',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: 4,
  },
  plan: {
    fontSize: 16,
    lineHeight: theme.spacing(2 * 3),
    fontWeight: 400,
    color: theme.palette.grey[600],
  },
  summary: {
    fontSize: 16,
    lineHeight: theme.spacing(2 * 3),
    fontWeight: 400,
    color: theme.palette.text.primary,
    paddingBottom: theme.spacing(2 * 1.5),
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'block',
  },
  included: {
    fontSize: 16,
    lineHeight: theme.spacing(2 * 3),
    fontWeight: 400,
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& svg': {
      width: 24,
      height: 24,
      color: theme.palette.primary.main,
    },
  },
  item: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 12,
    marginTop: theme.spacing(2 * 2.5),
    padding: theme.spacing(2 * 2),
  },
  info: {
    marginTop: theme.spacing(2 * 1.5),
    fontSize: 16,
    lineHeight: theme.spacing(2 * 3),
    fontWeight: 700,
    display: 'block',
  },
  liner: {
    background: premiumColor,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    '-webkit-box-decoration-break': 'clone',
  },
  primary: {
    color: theme.palette.primary.main,
  },
  learnMore: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 16,
    textAlign: 'center',
    marginTop: theme.spacing(2 * 2.5),

    '& em': {
      fontStyle: 'normal',
      marginBottom: theme.spacing(2 * 1),
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: 20,
  },
  collapse: {
    marginTop: theme.spacing(2 * 1.5),
  },
}));
