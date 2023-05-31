import { makeStyles } from 'tss-react/mui';

export interface UseTableRowStylesParams {
  isFirst: boolean;
  length: number;
  opacity: number;
}

export const useTableRowStyles = makeStyles<UseTableRowStylesParams>()(
  (theme, { isFirst, length, opacity }) => ({
    cell: {
      display: 'flex',
      alignItems: 'center',

      padding: theme.spacing(2, 0),

      borderTop: `1px solid ${theme.palette.grey[100]}`,

      color: isFirst ? theme.palette.primary.main : theme.palette.grey[800],

      fontWeight: isFirst ? 700 : 500,
      fontSize: 12,
      lineHeight: '16px',
    },
    line: {
      width: `${length}%`,
      height: 8,

      borderRadius: 8,

      backgroundColor: theme.palette.primary.main,
      opacity,
    },
  }),
);
