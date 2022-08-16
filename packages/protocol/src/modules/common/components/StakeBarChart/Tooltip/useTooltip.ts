import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useTooltipStyles = makeStyles<Theme, { maxMethodWidth: number }>(
  theme => ({
    root: {
      width: ({ maxMethodWidth }) => `${maxMethodWidth}px`,
      borderRadius: 12,
      padding: theme.spacing(2, 2.5),
      boxShadow:
        '0px 0px 5px rgba(31, 34, 38, 0.1), 0px 0px 15px rgba(31, 34, 38, 0.1)',
      backgroundColor: theme.palette.common.white,
    },
    label: {
      fontSize: 17,
      lineHeight: '24px',
      fontWeight: 700,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(2.5),
    },
    totalRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: theme.spacing(1.5),
      borderBottom: `2px solid ${theme.palette.background.default}`,
      marginBottom: theme.spacing(1.5),
    },
    total: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 400,
      color: theme.palette.grey[600],
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(1.5),
    },
    name: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 400,
      color: theme.palette.grey[700],
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 400,
      color: theme.palette.grey[700],
    },
  }),
);
