import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useUserGroupDialogStyles = makeStyles()((theme: Theme) => ({
  dialogTitle: {
    fontSize: theme.typography.fontSize * 2,

    display: 'block',
    textAlign: 'center',
    marginBottom: theme.spacing(8),
  },

  paperRoot: {
    width: '100%',
  },
}));
