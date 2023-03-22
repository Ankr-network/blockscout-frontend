import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useUserGroupDialogContentStyles = makeStyles()((theme: Theme) => ({
  button: {
    marginTop: theme.spacing(8),
  },
  label: {
    fontSize: 14,
    marginLeft: theme.spacing(3),
  },
  checkbox: {
    display: 'block',
    marginTop: theme.spacing(3.5),
    width: '100%',
    textAlign: 'center',
  },
}));
