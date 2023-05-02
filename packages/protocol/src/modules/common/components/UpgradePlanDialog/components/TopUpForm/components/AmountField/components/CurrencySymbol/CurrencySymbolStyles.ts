import { makeStyles } from 'tss-react/mui';

export const useCurrencySymbolStyles = makeStyles<boolean>()(
  (theme, isDisabled) => ({
    root: {
      color: isDisabled ? undefined : theme.palette.text.primary,

      fontSize: 63,
      fontWeight: 700,
      lineHeight: '72px',
    },
  }),
);
