import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

interface IHeight {
  size: 'm' | 'l';
}

export const useStyles = makeStyles<IHeight>()(
  (theme: Theme, props: IHeight) => ({
    formGroup: {
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        flexGrow: 1,
      },
    },
    inputBase: {
      fontSize: 14,
      borderRadius: 12,
      maxHeight: props.size === 'l' ? 48 : 44,
      '& + p': {
        fontSize: 12,
        lineHeight: 1.6,
        marginTop: theme.spacing(2 * 0.5),
      },
    },
    input: {
      minHeight: props.size === 'l' ? 48 : 44,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 400,
    },
  }),
);
