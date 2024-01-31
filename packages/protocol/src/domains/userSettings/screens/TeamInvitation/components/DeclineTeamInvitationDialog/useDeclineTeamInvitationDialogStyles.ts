import { makeStyles } from 'tss-react/mui';

export const useDeclineTeamInvitationDialogStyles = makeStyles()(theme => ({
  dialogPaper: {
    width: 600,
  },
  description: {
    maxWidth: 468,
    marginBottom: theme.spacing(8),

    color: theme.palette.text.secondary,
  },
  declineButton: {
    marginBottom: theme.spacing(3),
  },
}));
