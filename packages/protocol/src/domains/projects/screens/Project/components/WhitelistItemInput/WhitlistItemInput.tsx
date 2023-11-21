import {
  FormControl,
  InputLabel,
  TextField,
  TextFieldProps,
} from '@mui/material';

import { useWhitelistItemInputStyles } from './useWhitelistItemInputStyles';

export type WhitelistItemInputProps = TextFieldProps & {
  label: string;
};

export const WhitelistItemInput = ({
  label,
  ...inputProps
}: WhitelistItemInputProps) => {
  const { classes } = useWhitelistItemInputStyles();

  return (
    <FormControl className={classes.root}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <TextField {...inputProps} />
    </FormControl>
  );
};
