import { makeStyles } from 'tss-react/mui';

export const useClientNewReferralCodeModalStyles = makeStyles()(theme => ({
  button: {
    textTransform: 'none',
    width: '40%',
  },
  paper: {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    position: 'absolute',
    width: 580,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    borderRadius: theme.spacing(6),
    maxHeight: 'calc(100vh - 50px)',
    overflowY: 'auto',
  },
  form: {
    marginTop: 20,
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));
