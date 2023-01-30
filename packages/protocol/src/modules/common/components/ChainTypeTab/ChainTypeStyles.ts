import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, isSelected: boolean) => ({
    root: {
      padding: theme.spacing(2 * 0.5, 2 * 1.5),
      borderRadius: 6,

      color: theme.palette.primary.main,

      cursor: 'pointer',
      letterSpacing: '0.01em',

      fontWeight: 500,
      fontSize: theme.spacing(2 * 1.75),
      lineHeight: theme.spacing(2 * 2.5),

      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 1.5),
        fontSize: 12,
      },
      ...(isSelected
        ? {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.paper,
          }
        : {}),
    },
  }),
);
