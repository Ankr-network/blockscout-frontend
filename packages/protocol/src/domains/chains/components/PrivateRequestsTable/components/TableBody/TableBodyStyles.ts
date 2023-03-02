import { makeStyles } from 'tss-react/mui';

import { TableVariant } from '../../types';

export const useTableBodyStyles = makeStyles<TableVariant>()(
  (theme, variant) => {
    const commonRoot = {
      display: 'grid' as const,
      gridTemplateColumns: 'max-content auto max-content',
      gap: theme.spacing(5),

      width: '100%',
    };

    const defaultRoot = {
      ...commonRoot,
      position: 'absolute' as const,
      top: 34,
      left: 0,
      overflowY: 'auto' as const,

      height: 210,
      paddingBottom: theme.spacing(2),

      color: theme.palette.grey[800],
    };

    const integratedRoot = {
      ...commonRoot,

      padding: theme.spacing(0, 7.5),
      color: theme.palette.common.white,
    };

    const styles = {
      [TableVariant.Default]: defaultRoot,
      [TableVariant.Integrated]: integratedRoot,
    };

    return {
      root: styles[variant],
    };
  },
);
