import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(2 * 3.5),
  },
  logo: {
    width: 44,
    minHeight: 44,
    marginBottom: theme.spacing(2 * 2),
  },
  title: {
    textTransform: 'capitalize',
    fontSize: 34,
  },
  right: {
    flex: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '100%',
  },
}));
