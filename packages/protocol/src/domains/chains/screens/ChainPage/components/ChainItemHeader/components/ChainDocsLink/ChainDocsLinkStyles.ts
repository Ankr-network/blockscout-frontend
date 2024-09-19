import { makeStyles } from 'tss-react/mui';

export const useChainDocsLinkStyles = makeStyles()(theme => ({
  root: {
    border: `2px solid ${theme.palette.background.default}`,
    boxShadow: 'none',
  },
  icon: {
    '&&': {
      fontSize: 24,
    },
  },
  docsText: {
    marginLeft: theme.spacing(1),
    fontWeight: 500,
  },
}));
