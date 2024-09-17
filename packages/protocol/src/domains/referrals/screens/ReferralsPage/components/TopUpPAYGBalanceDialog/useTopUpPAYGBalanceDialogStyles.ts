import { dialogContentClasses, dialogTitleClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

const name = 'TopUpPAYGBalanceDialog';

export const useTopUpPAYGBalanceDialogStyles = makeStyles({ name })(theme => ({
  paper: {
    width: 600,

    borderRadius: 40,

    [`>.${dialogTitleClasses.root}`]: {
      marginBottom: theme.spacing(6),
    },

    [`>.${dialogContentClasses.root}`]: {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(8),
    },
  },
}));
