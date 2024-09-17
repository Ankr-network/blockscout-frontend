import { makeStyles } from 'tss-react/mui';

export const useChainViewSelectorStyles = makeStyles()(theme => ({
  chainsViewSelector: {
    marginLeft: 'auto',
    padding: 2,
    '&&': {
      backgroundColor: theme.palette.divider,
    },
  },
  chainViewTabWrapper: {
    padding: theme.spacing(1.25, 4),
  },
  chainViewTab: {
    lineHeight: 0,
    padding: theme.spacing(0.75, 0),
  },
  chainViewTabSelected: {
    svg: {
      color: theme.palette.primary.main,
    },
  },
}));
