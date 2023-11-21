import { makeStyles } from 'tss-react/mui';

export const useEndpointPlaceholderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  container: {
    width: '100%',
    padding: '10px 13.5px',
    backgroundColor: theme.palette.background.default,
    minHeight: 36,
    borderRadius: theme.spacing(3.5),
  },
}));
