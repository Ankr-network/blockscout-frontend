import { makeStyles } from 'tss-react/mui';

export const useProjectChainDetailsStyles = makeStyles()(theme => ({
  root: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },

  header: {
    borderRadius: 0,
    margin: 0,
  },

  codeSampleWrapper: {
    borderRadius: 0,
  },
}));
