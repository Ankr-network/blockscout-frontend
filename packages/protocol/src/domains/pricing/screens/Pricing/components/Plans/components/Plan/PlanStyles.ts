import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

const INFO_ICON_HEIGHT = 20;

export const usePlanStyles = makeStyles()(theme => ({
  container: {
    padding: theme.spacing(0.5),
    borderRadius: 42,
    height: '100%',

    [theme.breakpoints.down('xs')]: {
      maxHeight: 550,
    },
  },
  root: {
    background: theme.palette.background.paper,
    padding: theme.spacing(5.25),
    borderRadius: 18,
    height: '100%',
    position: 'relative',
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
  header: {
    height: 220,
  },
  tip: {
    textTransform: 'uppercase',
    color: theme.palette.common.white,
    fontSize: 10,
    lineHeight: '135%',
    fontWeight: 500,
    marginBottom: theme.spacing(2.5),
    borderRadius: 5,
    padding: theme.spacing(0.5, 1, 0.5, 1.25),
    width: 'fit-content',
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '140%',
    letterSpacing: '0.01em',
  },
  labelWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: 20,
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(4.5),
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: '110%',
    letterSpacing: '-0.04em',
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(10.5),
  },
  discount: {
    position: 'absolute',
    width: 96,
    top: -24,
    right: 0,
  },
  price: {
    display: 'block',
    marginBottom: theme.spacing(4.5),
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '140%',
    letterSpacing: '0.01em',

    '& em': {
      color: theme.palette.text.primary,
      fontStyle: 'normal',
      fontSize: 32,
      fontWeight: 600,
      lineHeight: '105%',
      letterSpacing: '-0.04em',
    },

    '& #secondary': {
      color: theme.palette.text.secondary,
      fontWeight: 400,
    },
  },
  divider: {
    color: theme.palette.background.default,
    height: 2,
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(4.5),
    borderBottomWidth: 2,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  item: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    height: INFO_ICON_HEIGHT,
    width: INFO_ICON_HEIGHT,
    marginRight: theme.spacing(2),
    color: theme.palette.grey[600],
  },
}));
