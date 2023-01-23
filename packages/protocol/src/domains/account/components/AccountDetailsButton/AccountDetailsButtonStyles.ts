import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, isMobile: boolean) => ({
    accountDetailsButtonRoot: isMobile
      ? {
          padding: theme.spacing(2 * 1.25, 2 * 1.5),
          border: `2px solid ${theme.palette.grey[100]}`,
          borderRadius: theme.spacing(2 * 1.5),
          backgroundColor: theme.palette.common.white,
        }
      : {
          backgroundColor: theme.palette.common.white,
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
        }
      : {
          fontWeight: 600,
          fontSize: theme.spacing(2 * 2),
          lineHeight: theme.spacing(2 * 3),
        },
    balance: {
      display: 'inline-block',
    },
    currency: {
      display: isMobile ? 'none' : '',
      color: theme.palette.grey[600],
    },
  }),
);
