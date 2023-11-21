import { makeStyles } from 'tss-react/mui';

export const useArchiveMethodsCellStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  tooltipIcon: {
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));
