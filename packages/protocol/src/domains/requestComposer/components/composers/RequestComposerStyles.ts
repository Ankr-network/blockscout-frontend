import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useRequestComposerStyles = makeStyles()((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    padding: theme.spacing(2 * 3.75),

    borderRadius: theme.spacing(2 * 3.75),

    backgroundColor: theme.palette.common.white,
  },
  container: {
    display: 'flex',
    gap: theme.spacing(2 * 3.5),
  },
  menu: {
    width: '40%',
  },
  logs: {
    width: '60%',
  },
}));
