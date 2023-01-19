import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useSampleCodeDialogStyles = makeStyles()((theme: Theme) => ({
  paper: {
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: '32.2px',
    marginBottom: theme.spacing(2 * 4),
    wordBreak: 'break-all',
    marginRight: theme.spacing(2 * 5),
  },
  codeArea: {
    position: 'relative',
    borderRadius: theme.spacing(2 * 3),

    backgroundColor: theme.palette.grey[800],
  },
}));
