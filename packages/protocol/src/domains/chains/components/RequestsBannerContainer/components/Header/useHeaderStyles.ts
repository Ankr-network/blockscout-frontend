import { makeStyles } from 'tss-react/mui';

import { NOTICE_WIDTH, NOTICE_MARGIN } from '../../../RequestsChart/const';

export const useHeaderStyles = makeStyles()(theme => ({
  information: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(5),
    width: `calc(100% - ${NOTICE_WIDTH + NOTICE_MARGIN}px)`,

    [theme.breakpoints.down('xl')]: {
      width: '100%',
      marginBottom: theme.spacing(2 * 4.25),
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(3.5),
    },
  },
  title: {
    marginRight: theme.spacing(1),

    color: theme.palette.grey[900],

    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    },
  },
  infoTitle: {
    display: 'flex',
    gap: theme.spacing(10),
    marginLeft: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: theme.spacing(4),
    },
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: theme.palette.grey[600],
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,
    marginLeft: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  info: {
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    color: theme.palette.grey[900],
    marginLeft: theme.spacing(3),

    [theme.breakpoints.down('md')]: {
      fontSize: 16,
      lineHeight: '24px',
    },
  },

  switcher: {
    '&&&': {
      borderWidth: 2,
    },
  },

  timeframeTabs: {
    marginRight: 'auto',
    marginLeft: theme.spacing(3),
    height: 32,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
    },
  },
}));
