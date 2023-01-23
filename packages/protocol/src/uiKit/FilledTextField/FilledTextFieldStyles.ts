import { Theme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';

export type UseFilledTextFieldStylesParams = {
  noPlaceholderFade?: boolean;
};

export const useFilledTextfieldStyles =
  makeStyles<UseFilledTextFieldStylesParams>()(
    (theme: Theme, props: UseFilledTextFieldStylesParams) => ({
      textFieldInput: {
        fontWeight: 600,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        padding: `0 0 0 ${theme.spacing(2 * 2)} !important`,

        borderRadius: 14,
        height: 40,
        boxSizing: 'border-box',

        '&:hover': {
          backgroundColor: theme.palette.background.default,
        },
        '&.Mui-focused': {
          backgroundColor: theme.palette.background.default,
        },
      },
      textFieldInputBase: {
        minHeight: 40,
        caretColor: theme.palette.primary.main,
        '&::placeholder': {
          opacity: props.noPlaceholderFade ? 1 : undefined,
        },
      },
    }),
  );
