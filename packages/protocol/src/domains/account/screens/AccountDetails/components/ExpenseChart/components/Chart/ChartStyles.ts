import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  chartRoot: {
    padding: theme.spacing(2 * 2.5, 2 * 3.75),
    borderRadius: 30,

    backgroundColor: theme.palette.background.paper,
  },
}));
