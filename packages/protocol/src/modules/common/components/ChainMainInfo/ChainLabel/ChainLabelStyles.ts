import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  tool: {
    display: 'flex',
  },
  chainLabel: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1, 2),
    borderRadius: 8,
    lineHeight: 1,
  },
  circle: {
    marginRight: theme.spacing(2),
  },
}));
