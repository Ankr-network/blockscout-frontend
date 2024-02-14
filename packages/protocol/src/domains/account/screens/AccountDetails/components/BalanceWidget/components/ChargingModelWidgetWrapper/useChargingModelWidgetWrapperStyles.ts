import { makeStyles } from 'tss-react/mui';

export const useChargingModelWidgetWrapperStyles = makeStyles()(theme => ({
  progressBar: {
    marginTop: theme.spacing(3),
  },
  expiredNoticeWrapper: {
    backgroundColor: theme.palette.warning.light,
    marginTop: theme.spacing(4),
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
