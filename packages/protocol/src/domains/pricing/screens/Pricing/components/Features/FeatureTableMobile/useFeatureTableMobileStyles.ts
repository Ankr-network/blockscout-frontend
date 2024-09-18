import { makeStyles } from 'tss-react/mui';

export const useFeatureTableMobileStyles = makeStyles()(theme => ({
  root: {
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    lineHeight: '27.6px',
    fontWeight: 700,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(6),
  },
  content: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 30,
  },
  lastItem: {
    borderTop: 'none',
  },
}));
