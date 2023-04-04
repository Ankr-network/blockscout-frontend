import { makeStyles } from 'tss-react/mui';

export interface UseStylesParams {
  hasStatusTransition: boolean;
  isMobile: boolean;
}

export const useStyles = makeStyles<UseStylesParams>()(
  (theme, { hasStatusTransition, isMobile }) => ({
    accountDetailsButtonRoot: isMobile
      ? {
          padding: theme.spacing(2 * 1.25, 2 * 1.5),
          border: `2px solid ${theme.palette.divider}`,
          borderRadius: theme.spacing(2 * 1.5),
          backgroundColor: theme.palette.background.paper,

          [theme.breakpoints.down('xs')]: {
            minWidth: 40,
          },
        }
      : {
          backgroundColor: theme.palette.background.paper,
        },
    content: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? theme.spacing(2 * 0.75) : theme.spacing(2 * 1),
    },
    label: isMobile
      ? {
          fontWeight: 600,
          fontSize: 11,
          lineHeight: theme.spacing(2 * 2),

          [theme.breakpoints.down('xs')]: {
            display: 'none',
          },
        }
      : {
          fontWeight: 600,
          fontSize: theme.spacing(2 * 2),
          lineHeight: theme.spacing(2 * 3),
        },
    balance: {
      display: 'inline-block',

      color: hasStatusTransition ? theme.palette.grey[600] : undefined,
    },
    currency: {
      display: isMobile ? 'none' : '',
      color: theme.palette.grey[600],
    },
  }),
);
