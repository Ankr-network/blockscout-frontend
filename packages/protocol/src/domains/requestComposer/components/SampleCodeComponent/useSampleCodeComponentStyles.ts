import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSampleCodeComponentStyles = makeStyles()((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(2 * 3),
  },
}));
