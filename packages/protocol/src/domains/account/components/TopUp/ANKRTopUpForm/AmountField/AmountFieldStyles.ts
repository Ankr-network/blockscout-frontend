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
      fontSize: 14,
      borderRadius: 12,
      maxHeight: size === 'l' ? 48 : 44,
      '& + p': {
        fontSize: 12,
        lineHeight: 1.6,
        marginTop: theme.spacing(2 * 0.5),
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
  }),
);
