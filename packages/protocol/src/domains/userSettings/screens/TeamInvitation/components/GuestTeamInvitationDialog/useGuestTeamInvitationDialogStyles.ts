import { dialogContentClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

export const useGuestTeamInvitationDialogStyles = makeStyles()(theme => ({
  dialogPaper: {
    width: 600,

    borderRadius: 40,

    [`.${dialogContentClasses.root}`]: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(8),
    },
  },
}));
