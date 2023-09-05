import { makeStyles } from 'tss-react/mui';

export const useAllowedUserProjectsModalStyles = makeStyles()(theme => ({
  modalContent: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 320,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    borderRadius: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(4),
  },
}));
