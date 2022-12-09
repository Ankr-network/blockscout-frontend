import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useSampleCodeDialogStyles = makeStyles<Theme>(theme => ({
  root: {},
  title: {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: '32.2px',
    marginBottom: theme.spacing(4),
    wordBreak: 'break-all',
    marginRight: theme.spacing(5),
  },
  codeArea: {
    position: 'relative',
    borderRadius: theme.spacing(3),

    backgroundColor: theme.palette.grey[700],
  },
}));
