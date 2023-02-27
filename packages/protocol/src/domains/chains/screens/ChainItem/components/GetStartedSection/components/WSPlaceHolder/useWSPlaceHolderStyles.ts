import { makeStyles } from 'tss-react/mui';

export const useWSPlaceHoderStyles = makeStyles()(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2 * 1.75),
  },
  container: {
    width: '100%',
    padding: '10px 13.5px',
    backgroundColor: theme.palette.background.default,
    minHeight: 36,
    cursor: 'pointer',
    borderRadius: theme.spacing(3.5),
  },
}));
