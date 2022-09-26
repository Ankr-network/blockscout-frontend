import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles<
  Theme,
  { shouldShowMobileBreadcrumbs: boolean }
>(theme => ({
  link: {
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 1.167,
    '&.custom-link:hover': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('md')]: {
      padding: 10,
      border: '1px solid #CDCDCD',
      borderRadius: '50%',
      width: 24,
      height: 24,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  text: {},
  separator: {
    fontSize: 14,
    display: ({ shouldShowMobileBreadcrumbs }) =>
      shouldShowMobileBreadcrumbs ? 'none' : 'flex',

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  breadcrumbsRoot: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  breadcrumbs: {
    flexWrap: 'nowrap',
    alignItems: 'baseline',
  },
  breadcrumbsLi: {
    overflow: 'hidden',
    flexShrink: 0,

    '&:last-child': {
      flexShrink: 1,
    },
  },
  typography: {
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  mobileBackButton: {
    transform: 'rotate(180deg)',
  },
}));
