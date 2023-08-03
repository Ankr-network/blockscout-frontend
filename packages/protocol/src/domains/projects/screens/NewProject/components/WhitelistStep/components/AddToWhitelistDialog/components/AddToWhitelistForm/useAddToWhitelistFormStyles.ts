import { selectClasses } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { isLightTheme } from 'uiKit/Theme/themeUtils';

export const useAddToWhitelistFormStyles = makeStyles()(theme => ({
  formWrapper: {
    width: 530,
  },
  selectWrapper: {
    position: 'relative',
    marginBottom: theme.spacing(6),
    height: 78,

    [`& .${selectClasses.select}`]: {
      fontSize: 16,
      fontWeight: 600,
      backgroundColor: 'transparent',
    },

    '&&:hover': {
      backgroundColor: 'transparent',
    },
  },
  inputWrapper: {
    marginBottom: theme.spacing(8),
  },
  selectPlaceholder: {
    position: 'absolute',
    top: 42,
    left: 16,
    color: theme.palette.text.secondary,
    fontSize: 16,
    fontWeight: 600,

    '&.Mui-focused': {
      color: theme.palette.text.secondary,
    },
  },
  submitButton: {
    marginBottom: theme.spacing(3),
  },
  chainsTitle: {
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '135%',
    marginBottom: theme.spacing(3),
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '22.4px',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
  },
  divider: {
    height: 1,
    marginBottom: theme.spacing(4),
  },
  chainWrapper: {
    marginBottom: theme.spacing(3),
  },
  label: {
    color: isLightTheme(theme)
      ? theme.palette.text.primary
      : theme.palette.common.white,
  },
}));
