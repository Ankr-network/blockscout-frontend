import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainDocsLinkStyles = makeStyles()((theme: Theme) => ({
  button: {
    height: theme.spacing(2 * 5),
    padding: theme.spacing(2 * 1, 2),

    border: `2px solid ${theme.palette.background.default}`,
    boxShadow: 'none',
    borderRadius: theme.spacing(2 * 1.75),
  },
  iconSize: {
    '& > *:first-of-type': {
      fontSize: theme.spacing(2 * 3),
    },
  },
}));
