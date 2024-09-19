import { makeStyles } from 'tss-react/mui';

export const useSubchainLabelsStyles = makeStyles()(theme => ({
  subchainLabel: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    whiteSpace: 'nowrap',
    fontSize: 14,
    height: 20,
  },
}));
