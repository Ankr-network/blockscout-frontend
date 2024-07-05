import { makeStyles } from 'tss-react/mui';

export interface UseCheckboxStylesParams {
  hasBorderBottom?: boolean;
  hasPadding?: boolean;
  hasMarginTop?: boolean;
}

export const useCheckboxStyles = makeStyles<UseCheckboxStylesParams>()(
  (theme, { hasBorderBottom, hasMarginTop, hasPadding }) => ({
    root: {
      padding: hasPadding ? theme.spacing(3, 0) : theme.spacing(1),

      borderBottom: hasBorderBottom
        ? `1px solid ${theme.palette.divider}`
        : undefined,

      marginTop: hasMarginTop ? theme.spacing(3) : 0,
    },
    label: {
      paddingLeft: theme.spacing(1.5),

      fontSize: 16,
      fontWeight: 400,
    },
    labelWrapper: {
      paddingLeft: theme.spacing(1.5),
    },
  }),
);
