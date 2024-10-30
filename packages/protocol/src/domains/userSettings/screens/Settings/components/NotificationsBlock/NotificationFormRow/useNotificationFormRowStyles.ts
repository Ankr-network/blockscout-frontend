import { makeStyles } from 'tss-react/mui';

import { DESKTOP_COLUMNS, MOBILE_COLUMNS } from 'modules/notifications/const';

export const useNotificationFormRowStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(3, 0),
    minHeight: 48,
    display: 'grid',
    borderBottom: `1px solid ${theme.palette.divider}`,
    gridTemplateColumns: DESKTOP_COLUMNS,
    gridTemplateAreas: `
      "label in-app email"
    `,

    [theme.breakpoints.down('sm')]: {
      minHeight: 44,

      gridTemplateColumns: MOBILE_COLUMNS,
      gridTemplateAreas: `
        "label email"
      `,
    },
  },
  label: {
    gridArea: 'label',
    display: 'flex',
    alignItems: 'center',
  },
  inApp: {
    gridArea: 'in-app',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  email: {
    gridArea: 'email',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
    },
  },
}));
