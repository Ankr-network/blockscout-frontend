import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useAccountItemStyles = makeStyles()((theme: Theme) => ({
  root: {
    border: `2px solid ${theme.palette.background.default}`,
    borderRadius: 20,
    width: '100%',
    padding: theme.spacing(4.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  active: {
    borderColor: theme.palette.primary.main,
    cursor: 'default',
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: 600,
    textTransform: 'capitalize',
    maxWidth: '100%',
  },
}));
