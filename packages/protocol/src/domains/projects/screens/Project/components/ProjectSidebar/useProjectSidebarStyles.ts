import { makeStyles } from 'tss-react/mui';

export const useProjectSidebarStyles = makeStyles()(theme => ({
  paper: {
    overflow: 'hidden',

    height: '100vh',
    minWidth: 540,

    borderRadius: 0,
    backgroundImage: 'none',
  },
  content: {
    padding: theme.spacing(0, 8),
  },
}));
