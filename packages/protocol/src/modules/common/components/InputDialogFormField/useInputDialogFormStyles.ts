import { makeStyles } from 'tss-react/mui';

interface InputDialogFormProps {
  isMultiline?: boolean;
}

export const useInputDialogFormStyles = makeStyles<InputDialogFormProps>()(
  (theme, { isMultiline }) => ({
    inputBase: {
      display: isMultiline ? 'unset' : 'inline-flex',
      borderRadius: 17,
      fontSize: 14,
      height: isMultiline ? 120 : 44,

      '& input': {
        minHeight: 'auto',
        borderRadius: 'unset',
      },

      '& label': { marginBottom: theme.spacing(4), fontWeight: 700 },
    },
    domain: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(7),
    },
  }),
);
