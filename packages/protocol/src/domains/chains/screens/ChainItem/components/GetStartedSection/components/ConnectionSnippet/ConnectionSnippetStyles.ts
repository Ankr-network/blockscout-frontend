import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  connectionSnippet: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 2),
  },
}));
