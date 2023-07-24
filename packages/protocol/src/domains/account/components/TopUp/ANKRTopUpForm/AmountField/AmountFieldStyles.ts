import { makeStyles } from 'tss-react/mui';

interface AmountFieldStylesProps {
  pristine?: boolean;
  size: 'm' | 'l';
  isUSD?: boolean;
}

export const useAmountFieldStyles = makeStyles<AmountFieldStylesProps>()(
  (theme, { isUSD, pristine, size }) => ({
    formGroup: {
      [theme.breakpoints.down('sm')]: {
        width: 'auto',
        flexGrow: 1,
      },
    },
    inputBase: {
      padding: theme.spacing(0, 4),
      maxHeight: size === 'l' ? 48 : 44,

      borderRadius: 17,

      fontSize: 14,

      '& + p': {
        fontSize: 12,
        lineHeight: 1.6,
        marginTop: theme.spacing(),
      },

      '&&': {
        minHeight: 46,
      },
    },
    input: {
      minHeight: size === 'l' ? 48 : 44,

      ...(isUSD
        ? {
            color: theme.palette.grey[pristine ? 400 : 900],
          }
        : {}),
    },
    subtitle: {
      whiteSpace: 'nowrap',

      fontSize: 16,
      fontWeight: 400,
    },
    disabled: isUSD
      ? {
          '&&': {
            color: theme.palette.grey[900],
            WebkitTextFillColor: theme.palette.grey[900],
          },
        }
      : {},
    credits: {
      color: theme.palette.grey[600],

      WebkitTextFillColor: theme.palette.grey[600],
    },
  }),
);
