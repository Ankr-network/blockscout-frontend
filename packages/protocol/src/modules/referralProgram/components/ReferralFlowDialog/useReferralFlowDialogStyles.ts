import { makeStyles } from 'tss-react/mui';

export const useReferralFlowDialogStyles = makeStyles()(theme => ({
  paper: {
    width: 600,
    padding: 0,

    borderRadius: 40,

    [`${theme.breakpoints.down('sm')}`]: {
      padding: 0,
    },
  },
  closeButton: {
    top: 40,
    right: 40,

    backgroundColor: theme.palette.background.paper,

    '&:hover': {
      backgroundColor: theme.palette.background.default,
    },
  },
  dialogTitle: {
    margin: 0,
  },
  topBanner: {
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(6),

    padding: theme.spacing(8, 10, 10),
  },
}));
