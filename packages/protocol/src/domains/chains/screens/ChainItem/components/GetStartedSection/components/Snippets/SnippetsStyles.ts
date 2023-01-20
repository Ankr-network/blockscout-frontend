import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  snippets: {
    overflow: 'hidden',

    display: 'flex',
    gap: theme.spacing(2 * 3.75),

    padding: theme.spacing(2 * 3, 2 * 3.75),

    borderRadius: theme.spacing(2 * 3.75),

    backgroundColor: theme.palette.background.paper,

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
