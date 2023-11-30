import { makeStyles } from 'tss-react/mui';

export const useAddChainsFormStyles = makeStyles()(theme => ({
  root: {
    maxWidth: 540,
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  description: {
    marginBottom: theme.spacing(8),
  },
  searchRoot: {
    width: '100%',
    marginBottom: theme.spacing(5),
  },
  search: {
    height: 40,

    backgroundColor: theme.palette.background.default,
  },
}));
