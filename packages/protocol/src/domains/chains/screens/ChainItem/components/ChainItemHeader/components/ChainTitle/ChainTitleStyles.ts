import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useChainTitleStyles = makeStyles()((theme: Theme) => ({
  chainTitle: {
    marginBottom: theme.spacing(2 * 0.5),

    letterSpacing: '-0.03em',

    color: theme.palette.text.primary,

    fontWeight: 700,
    fontSize: 35,
    lineHeight: theme.spacing(2 * 5),

    [theme.breakpoints.down('md')]: {
      fontSize: 31,
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 28,
      marginBottom: 0,
    },
  },
}));
