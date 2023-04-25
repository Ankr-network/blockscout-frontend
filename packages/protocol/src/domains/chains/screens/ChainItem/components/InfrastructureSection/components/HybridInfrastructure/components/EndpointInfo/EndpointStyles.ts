import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2 * 3.2),
  },
  trafficFlow: {
    marginBottom: theme.spacing(2 * 3),
  },
  section: {
    background: theme.palette.background.paper,
    borderRadius: 18,
    padding: theme.spacing(2 * 3.75),

    '&:not(:last-child)': {
      marginBottom: theme.spacing(2 * 4.5),
    },
  },
}));
