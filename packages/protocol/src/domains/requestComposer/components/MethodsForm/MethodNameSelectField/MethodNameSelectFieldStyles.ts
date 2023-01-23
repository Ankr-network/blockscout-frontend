import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export const useMethodNameSelectFieldStyles = makeStyles()((theme: Theme) => ({
  methodsSelect: {
    marginTop: theme.spacing(2 * 3),
  },
}));
