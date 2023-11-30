import { makeStyles } from 'tss-react/mui';

export interface UseStylesParams {
  hasStatusTransition: boolean;
}

export const useStyles = makeStyles<UseStylesParams>()(
  (theme, { hasStatusTransition }) => ({
    buttonRoot: {
      flexShrink: 0,
      border: 'none',
      backgroundColor: theme.palette.background.paper,
    },
    sidebarTypeButtonRoot: {
      border: `2px solid ${theme.palette.grey[100]}`,
    },

    mobileTypeButtonRoot: {
      padding: theme.spacing(2.5, 3),
      border: `2px solid ${theme.palette.divider}`,
      borderRadius: theme.spacing(3),
      backgroundColor: theme.palette.background.paper,

      [theme.breakpoints.down('xs')]: {
        display: 'inline-flex',
        minWidth: 40,
      },
    },
    content: {
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(2),
    },

    mobileTypeContent: {
      gap: theme.spacing(1.5),
    },

    label: {
      fontWeight: 500,
      fontSize: theme.spacing(4),
      lineHeight: theme.spacing(6),
    },
    mobileTypeLabel: {
      fontWeight: 600,
      fontSize: 11,
      lineHeight: theme.spacing(4),

      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    balance: {
      display: 'inline-block',

      color: hasStatusTransition ? theme.palette.grey[600] : undefined,
    },
    currency: {
      color: theme.palette.grey[600],
    },
    mobileTypeCurrency: {
      display: 'none',
    },
  }),
);
