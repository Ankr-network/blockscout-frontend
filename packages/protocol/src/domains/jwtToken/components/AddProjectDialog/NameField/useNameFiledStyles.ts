import { makeStyles } from 'tss-react/mui';

export const useNameFiledStyles = makeStyles()(theme => ({
  group: {
    marginBottom: theme.spacing(5),
  },
  title: {
    color: theme.palette.grey[400],
    fontSize: 16,
    lineHeight: 1.5,
    fontWeight: 700,
    marginBottom: theme.spacing(2),
  },
  field: {
    height: theme.spacing(12),
  },
}));
