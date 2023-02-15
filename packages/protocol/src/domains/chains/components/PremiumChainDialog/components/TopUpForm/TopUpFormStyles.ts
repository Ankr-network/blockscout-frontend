import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useTopUpFormStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    gap: theme.spacing(5),

    backgroundColor: theme.palette.background.paper,
  },
}));
