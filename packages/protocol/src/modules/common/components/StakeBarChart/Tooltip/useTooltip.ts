import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTooltipStyles = makeStyles<number>()(
  (theme: Theme, maxMethodWidth: number) => ({
    root: {
      width: maxMethodWidth,
      borderRadius: 12,
      padding: theme.spacing(2 * 2, 2 * 2.5),
      boxShadow:
        '0px 0px 5px rgba(31, 34, 38, 0.1), 0px 0px 15px rgba(31, 34, 38, 0.1)',
      backgroundColor: theme.palette.background.paper,
    },
    label: {
      fontSize: 17,
      lineHeight: theme.spacing(2 * 3),
      fontWeight: 700,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(2 * 2.5),
    },
    totalRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: theme.spacing(2 * 1.5),
      borderBottom: `2px solid ${theme.palette.grey[100]}`,
      marginBottom: theme.spacing(2 * 1.5),
    },
    total: {
      fontSize: 14,
      lineHeight: theme.spacing(2 * 2.5),
      fontWeight: 400,
      color: theme.palette.grey[600],
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2 * 1.5),
    },
    name: {
      fontSize: 14,
      lineHeight: theme.spacing(2 * 2.5),
      fontWeight: 400,
      color: theme.palette.grey[800],
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      fontSize: 14,
      lineHeight: theme.spacing(2 * 2.5),
      fontWeight: 400,
      color: theme.palette.grey[800],
    },
  }),
);
