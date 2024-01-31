import { makeStyles } from 'tss-react/mui';

export const useCreateTeamSuccessDialogStyles = makeStyles()(theme => ({
  createTeamSuccessDialogRoot: {
    padding: theme.spacing(10),
    maxWidth: 600,
  },
  createTeamSuccessDialogInner: {
    margin: 'auto',
    gap: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  iconSuccess: {
    width: 120,
    height: 120,
  },
  createTeamSuccessDialogCloseButton: {
    position: 'absolute',
    top: 0,
  },
  createTeamSuccessDialogTitle: {
    margin: 'auto',
    marginBottom: theme.spacing(4),
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  createTeamSuccessDialogButtons: {
    width: '100%',
    display: 'flex',
    gap: theme.spacing(3),
    marginTop: theme.spacing(5),
    alignItems: 'center',
    flexDirection: 'column',
  },
}));
