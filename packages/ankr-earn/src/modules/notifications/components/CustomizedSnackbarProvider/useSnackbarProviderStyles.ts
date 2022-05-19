import { makeStyles } from '@material-ui/core';

export const useSnackbarProviderStyles = makeStyles(theme => {
  const baseStyles = {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    padding: theme.spacing(1.5, 2),

    borderRadius: 12,
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow:
      '0px 0px 1px #B8C2D3, 0px 9px 12px -6px rgba(154, 161, 176, 0.31)',

    '&:before': {
      content: `''`,
      display: 'block',
      width: 4,
      height: '100%',
      marginRight: theme.spacing(1.25),

      background: 'var(--type-color, #ccc)',
      borderRadius: 2,
    },
  };

  return {
    containerAnchorOriginTopCenter: {
      width: '100%',
      maxWidth: `calc(100% - ${theme.spacing(2)})`,
      alignItems: 'stretch',

      [theme.breakpoints.up('md')]: {
        maxWidth: 700,
      },
    },

    error: {
      '--type-color': theme.palette.error.main,
      ...baseStyles,
    },

    info: {
      '--type-color': theme.palette.info.main,
      ...baseStyles,
    },

    warning: {
      '--type-color': theme.palette.warning.main,
      ...baseStyles,
    },

    success: {
      '--type-color': theme.palette.success.main,
      ...baseStyles,
    },
  };
});
