import { makeStyles } from 'tss-react/mui';

import { DESKTOP_COLUMNS, MOBILE_COLUMNS } from 'modules/notifications/const';

export const useStyles = makeStyles()(theme => ({
  balanceCheckbox: {
    marginBottom: theme.spacing(20),
  },
  description: {
    fontSize: 14,
    marginLeft: theme.spacing(5),
    marginBottom: theme.spacing(5),
    fontWeight: 400,
  },
  label: {
    marginTop: theme.spacing(0.5),
  },
  header: {
    marginTop: theme.spacing(6),
    display: 'grid',
    gridTemplateColumns: DESKTOP_COLUMNS,
    gridTemplateAreas: `
      "name in-app email"
    `,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: MOBILE_COLUMNS,
      gridTemplateAreas: `
        "name email"
      `,
      marginTop: 0,
    },
  },
  nameHeader: {
    gridArea: 'name',
  },
  inAppHeader: {
    gridArea: 'in-app',
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  emailHeader: {
    gridArea: 'email',
    textAlign: 'center',

    [theme.breakpoints.down('sm')]: {
      textAlign: 'end',
    },
  },
  basicRow: {
    width: '100%',
  },
  regularRow: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  row: {
    marginBottom: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  subtitle: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(6),
  },
  thirdPartyTitle: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(1),

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  firstSubtitle: {
    marginTop: 0,
  },
  divider: {
    marginTop: theme.spacing(2.5),
    marginBottom: theme.spacing(5),
    height: 1,
    backgroundColor: theme.palette.grey['400'],
  },
  alert: {
    marginTop: theme.spacing(3),

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));
