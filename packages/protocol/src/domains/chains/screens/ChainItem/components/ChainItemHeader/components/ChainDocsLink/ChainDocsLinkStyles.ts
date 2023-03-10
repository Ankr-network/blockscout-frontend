import { makeStyles } from 'tss-react/mui';

export const useChainDocsLinkStyles = makeStyles()(theme => ({
  button: {
    height: 48,
    minHeight: 48,
    padding: theme.spacing(3, 4),

    boxShadow: `inset 0 0 0 2px ${theme.palette.background.default} !important`,
    borderRadius: theme.spacing(2 * 1.75),

    '&:hover': {
      boxShadow: `inset 0 0 0 2px ${theme.palette.grey[100]} !important`,
    },
  },
  iconSize: {
    '& > *:first-of-type': {
      fontSize: theme.spacing(2 * 3),
    },
  },
}));
