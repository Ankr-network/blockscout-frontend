import { makeStyles } from 'tss-react/mui';

export const useAddChainsButtonStyles = makeStyles()(theme => ({
  root: {
    borderRadius: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,

    whiteSpace: 'nowrap',
  },
  text: {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '143%',
  },
  startIcon: {
    marginRight: theme.spacing(1),
  },
}));
