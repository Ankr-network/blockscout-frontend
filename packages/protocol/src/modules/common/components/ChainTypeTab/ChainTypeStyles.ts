import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles<boolean>()(
  (theme: Theme, isSelected: boolean) => ({
    root: {
      padding: theme.spacing(1, 3),
      borderRadius: 10,
      color: theme.palette.text.secondary,
      cursor: 'pointer',
      letterSpacing: '0.01em',
      fontWeight: 500,
      fontSize: theme.spacing(3.5),
      lineHeight: theme.spacing(5),
      transition: '.3s background-color',

      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 1.5),
        fontSize: 12,
      },
      ...(isSelected
        ? {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.background.paper,
            boxShadow:
              '0px 0px 15px 0px rgba(31, 34, 38, 0.10), 0px 0px 5px 0px rgba(31, 34, 38, 0.10)',
          }
        : {}),
    },
  }),
);
