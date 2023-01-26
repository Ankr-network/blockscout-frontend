import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainBlockStyles = makeStyles()((theme: Theme) => ({
  block: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 18,
    padding: theme.spacing(2 * 2.25),
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    fontSize: 14,
    color: theme.palette.text.primary,
    opacity: 0.5,
    paddingBottom: theme.spacing(2 * 1),
  },
  text: {
    fontSize: 18,
    minHeight: 24,
  },
  skeleton: {
    width: 160,
    height: 24,
    marginTop: theme.spacing(2 * -0.5),
    transform: 'none',
  },
}));
