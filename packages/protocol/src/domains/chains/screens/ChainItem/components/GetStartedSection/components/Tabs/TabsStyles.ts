import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  title: {
    marginRight: theme.spacing(2 * 4.375),

    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2 * 2),
    lineHeight: theme.spacing(2 * 3),

    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(2 * 2.5),

      fontSize: theme.spacing(2 * 1.5),
      lineHeight: theme.spacing(2 * 2.5),
    },
  },
}));
