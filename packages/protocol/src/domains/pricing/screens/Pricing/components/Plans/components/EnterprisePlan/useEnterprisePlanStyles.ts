import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

const INFO_ICON_HEIGHT = 20;

export const useEnterprisePlanStyles = makeStyles()(theme => ({
  root: {
    background: isLightTheme(theme)
      ? theme.palette.grey[900]
      : theme.palette.common.black,
    padding: theme.spacing(5.25, 6),
    borderRadius: 18,
    width: '100%',
    minHeight: 153,
    height: 'fit-content',
    position: 'relative',
    gridArea: 'enterprise',
    color: theme.palette.common.white,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 84,
      maxHeight: 100,
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '140%',
    letterSpacing: '0.01em',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(3),
  },
  column: {
    [theme.breakpoints.up('lg')]: {
      margin: 0,
    },
  },
  reverse: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
    lineHeight: '110%',
    letterSpacing: '-0.04em',
    color: theme.palette.common.white,
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(10.5),
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    height: 80,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
  },
  icon: {
    height: INFO_ICON_HEIGHT,
    width: INFO_ICON_HEIGHT,
    marginRight: theme.spacing(2),
    color: theme.palette.grey[600],
  },
  button: {
    minWidth: 211,
    width: '100%',
    borderRadius: 8,
    marginTop: theme.spacing(7.5),

    [theme.breakpoints.up('lg')]: {
      marginTop: 'auto',
    },
  },
}));
