import { makeStyles } from 'tss-react/mui';

export interface AmountFieldStylesParams {
  autoWidth: number;
  isModified?: boolean;
}

export const useAmountFieldStyles = makeStyles<AmountFieldStylesParams>()(
  (theme, { autoWidth, isModified }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing(3),

      padding: theme.spacing(6, 2.5),

      borderRadius: 20,

      backgroundColor: theme.palette.background.default,
    },
    autoWidth: {
      position: 'absolute',
      zIndex: -1,

      fontSize: 63,
      fontWeight: 700,
      lineHeight: '72px',
    },
    field: {
      alignItems: 'center',

      maxWidth: '100%',

      p: {
        marginRight: 0,
      },
    },
    input: {
      height: 'auto',
      width: autoWidth,

      color: isModified ? theme.palette.text.primary : theme.palette.grey[600],

      caretColor: theme.palette.primary.main,
      letterSpacing: '-0.03em',

      textOverflow: 'ellipsis',

      fontSize: '63px !important',
      fontWeight: '700 !important',
      lineHeight: '72px !important',
    },
    inputRoot: {
      height: 'auto',
      maxWidth: '100%',

      boxShadow: 'none',
      backgroundColor: 'transparent',

      '&.Mui-focused': {
        boxShadow: 'none !important',
      },

      '&.Mui-disabled': {
        boxShadow: 'none !important',
        backgroundColor: 'transparent !important',
      },

      '&.Mui-error': {
        boxShadow: 'none !important',

        input: {
          color: `${
            isModified ? theme.palette.text.primary : theme.palette.grey[600]
          } !important`,
        },
      },

      '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
      },
    },
  }),
);
