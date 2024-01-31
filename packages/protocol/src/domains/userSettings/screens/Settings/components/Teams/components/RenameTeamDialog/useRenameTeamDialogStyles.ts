import { makeStyles } from 'tss-react/mui';

export const useRenameTeamDialogStyles = makeStyles()(theme => ({
  root: {
    width: 600,
  },
  input: {
    marginBottom: theme.spacing(8),
  },
  removeButton: {
    marginBottom: theme.spacing(3),
  },
}));
