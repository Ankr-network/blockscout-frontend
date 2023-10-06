import { makeStyles } from 'tss-react/mui';

const FOOTER_HEIGHT = 192;

export const useNewProjectFormStyles = makeStyles()(theme => ({
  root: {
    padding: theme.spacing(8),
    borderRadius: 30,
  },
  contentWrapper: {
    paddingBottom: theme.spacing(10),
    height: `calc(100vh - ${FOOTER_HEIGHT}px)`,
    overflow: 'auto',
  },
}));
