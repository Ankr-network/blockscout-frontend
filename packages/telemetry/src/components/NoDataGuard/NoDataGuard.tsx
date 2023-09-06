import { OverlaySpinner } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useNoDataGuardStyles } from './NoDataGuardStyles';

export interface NoDataGuardProps<Data> {
  children: JSX.Element;
  data: Data;
  isEmpty?: (data: Data) => boolean;
  isLoading?: boolean;
}

export const NoDataGuard = <Data extends Array<any>>({
  children,
  data,
  isLoading,
  isEmpty = (list: Data) => list.length === 0,
}: NoDataGuardProps<Data>) => {
  const { classes } = useNoDataGuardStyles();

  if (isLoading) {
    return <OverlaySpinner />;
  }

  if (isEmpty(data)) {
    return <div className={classes.root}>{t('dashboard.no-data')}</div>;
  }

  return children;
};
