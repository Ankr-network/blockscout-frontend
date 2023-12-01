import { makeStyles } from 'tss-react/mui';

export const useChainsTableStyles = makeStyles()(theme => ({
  allChainsSelector: {
    display: 'inline-flex',
    width: theme.spacing(8),
    position: 'relative',
    top: theme.spacing(1.5),
  },
  headerCell: {
    '& svg': {
      color: theme.palette.text.secondary,
      height: theme.spacing(6),
    },
  },
}));
