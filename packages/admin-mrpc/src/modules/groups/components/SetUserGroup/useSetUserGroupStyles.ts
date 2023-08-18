import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSetUserGroupStyles = makeStyles()((theme: Theme) => ({
  button: {
    marginRight: 20,
    textTransform: 'none',
  },
  paper: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    width: 540,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    borderRadius: theme.spacing(6),
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
