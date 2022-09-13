import { makeStyles, Theme } from '@material-ui/core';

export type UseFilledTextFieldStylesParams = {
  noPlaceholderFade?: boolean;
};

export const useFilledTextfieldStyles = makeStyles<
  Theme,
  UseFilledTextFieldStylesParams
>(theme => ({
  textFieldInput: {
    fontWeight: 600,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,

    borderRadius: 14,
    height: 40,
    boxSizing: 'border-box',

    '&:hover': {
      border: `2px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.background.default,
    },
    '&.Mui-focused': {
      border: `2px solid ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.background.default,
    },
  },
  textFieldInputBase: {
    minHeight: 40,
    caretColor: theme.palette.primary.main,
    '&::placeholder': {
      opacity: ({ noPlaceholderFade }) => (noPlaceholderFade ? 1 : undefined),
    },
  },
}));
