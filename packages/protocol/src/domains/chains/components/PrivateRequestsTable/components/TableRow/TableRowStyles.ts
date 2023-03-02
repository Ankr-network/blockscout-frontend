import { makeStyles } from 'tss-react/mui';

import { TableVariant } from '../../types';

export const useTableRowStyles = makeStyles<TableVariant>()(
  (_theme, variant) => {
    const commonCell = {
      fontWeight: 400,
    };

    const defaultCell = {
      ...commonCell,
      fontSize: 12,
      lineHeight: '16.2px',

      '&:nth-of-type(1)': {
        width: '20%',
        minWidth: 70,
      },

      '&:nth-of-type(2)': {
        width: '55%',
        minWidth: 108,
      },

      '&:nth-of-type(3)': {
        width: '25%',
      },
    };

    const integratedCell = {
      ...commonCell,

      overflow: 'hidden',

      whiteSpace: 'pre-wrap' as const,
      wordBreak: 'break-all' as const,

      fontSize: 14,
      lineHeight: '20px',
    };

    const styles = {
      [TableVariant.Default]: { cell: defaultCell },
      [TableVariant.Integrated]: { cell: integratedCell },
    };

    return styles[variant];
  },
);
