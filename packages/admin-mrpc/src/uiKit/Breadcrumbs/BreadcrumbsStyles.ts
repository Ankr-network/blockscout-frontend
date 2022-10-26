import { Theme } from '@mui/material/styles';

import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  link: {
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 1.167,
    textDecoration: 'none',
    '&.custom-link:hover': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('lg')]: {
      padding: 10,
      border: '1px solid #CDCDCD',
      borderRadius: '50%',
      width: 31,
      height: 31,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  text: {},
  separator: {
    fontSize: 14,

    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
  breadcrumbsRoot: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  breadcrumbs: {
    flexWrap: 'nowrap',
    alignItems: 'center',
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
