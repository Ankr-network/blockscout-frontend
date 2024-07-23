import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const usePrimaryTabStyles = makeStyles<boolean>()(
  (theme: Theme, isSelected: boolean) => ({
    primaryTab: {
      overflow: 'visible',
      height: 'auto',
      marginRight: theme.spacing(7.5),
      padding: 0,
      transition: 'color .3s, background-color .3s',
      color: isSelected ? theme.palette.primary.main : theme.palette.grey[600],
      letterSpacing: '-0.01em',
      fontWeight: 700,
      fontSize: 27,
      lineHeight: theme.spacing(8),

      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        color: theme.palette.primary.main,
      },

      [theme.breakpoints.down('xs')]: {
        marginRight: theme.spacing(5),
        fontSize: theme.spacing(5),
      },
    },
  }),
);
