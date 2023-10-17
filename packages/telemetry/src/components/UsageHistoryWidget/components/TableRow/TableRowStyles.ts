import { makeStyles } from 'tss-react/mui';

export interface UseTableRowStylesParams {
  isFirst: boolean;
  length: number;
  opacity: number;
}

export const useTableRowStyles = makeStyles<UseTableRowStylesParams>()(
  (theme, { isFirst, length, opacity }) => ({
    row: {
      borderBottom: `1px solid ${theme.palette.grey[100]}`,
      display: 'flex',
      padding: theme.spacing(1, 0),
      fontSize: 12,
      lineHeight: '20px',
      color: isFirst ? theme.palette.primary.main : theme.palette.text.primary,
      fontWeight: isFirst ? 700 : 400,

      '&:last-of-type': {
        [theme.breakpoints.up('xl')]: {
          borderBottom: 'none',
        },
      },
    },
    cell: {
      width: '33%',
      display: 'flex',
      alignItems: 'center',
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
