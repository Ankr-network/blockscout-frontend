import { makeStyles } from 'tss-react/mui';

export const useSignupDialogStyles = makeStyles()(theme => ({
  dialogTitle: {
    fontSize: theme.typography.fontSize * 2,
    paddingRight: theme.spacing(13),
    display: 'flex',
    alignItems: 'flex-end',
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  paperRoot: {
    width: '100%',

    borderRadius: 40,
  },
}));
