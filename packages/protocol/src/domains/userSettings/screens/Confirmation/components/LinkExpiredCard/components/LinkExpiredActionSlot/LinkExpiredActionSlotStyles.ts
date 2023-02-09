import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  buttonContainer: {
    display: 'flex',
    gridGap: theme.spacing(2 * 1.5),
  },
}));