import { makeStyles } from 'tss-react/mui';

export const useLastPackageWarningStyles = makeStyles()(theme => ({
  expiredNoticeWrapper: {
    backgroundColor: theme.palette.warning.light,
    borderRadius: theme.spacing(4),
    padding: theme.spacing(3, 4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expiredNotice: {
    marginRight: theme.spacing(4),
  },
  btn: {
    flexShrink: 0,
  },
}));
