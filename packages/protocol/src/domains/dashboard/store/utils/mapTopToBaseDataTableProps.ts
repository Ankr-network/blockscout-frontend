import { IUsageTop } from 'multirpc-sdk';
import { BaseTableDataProps } from '@ankr.com/telemetry';
import { t } from '@ankr.com/common';

export const mapTopToBaseDataTableProps = (
  topItem?: IUsageTop,
): BaseTableDataProps[] => {
  return (
    topItem?.elements?.map(({ name, count }) => ({
      label: name,
      value: t('dashboard.top-countries.count', { count }),
    })) || []
  );
};
