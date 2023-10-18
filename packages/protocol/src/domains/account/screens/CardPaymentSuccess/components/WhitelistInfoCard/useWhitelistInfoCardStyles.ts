import { makeStyles } from 'tss-react/mui';

export const useWhitelistInfoCardStyles = makeStyles()(theme => ({
  title: {
    fontSize: 34,
    lineHeight: theme.spacing(10),
    fontWeight: 700,
  },
  description: {
    fontSize: 20,
    lineHeight: theme.spacing(7),
    fontWeight: 400,
    marginBottom: theme.spacing(7.5),
  },
}));
