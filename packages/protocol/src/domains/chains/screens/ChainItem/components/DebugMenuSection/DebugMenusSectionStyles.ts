import { makeStyles } from 'tss-react/mui';

export const useDebugMenuSectionStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(7.5),

    paddingTop: theme.spacing(7.5),
  },
}));
