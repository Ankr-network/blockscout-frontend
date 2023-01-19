import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainTitleStyles = makeStyles()((theme: Theme) => ({
  chainTitle: {
    marginBottom: theme.spacing(2 * 0.5),

    letterSpacing: '-0.01em',

    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: theme.spacing(2 * 4.25),
    lineHeight: theme.spacing(2 * 5),
  },
}));
