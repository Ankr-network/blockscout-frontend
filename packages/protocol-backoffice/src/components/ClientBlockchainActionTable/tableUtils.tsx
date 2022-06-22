import { ColumnsType } from 'antd/lib/table';
import { TUserBlockchainAction } from 'stores/useUserBlockchainActions/types';

export const tableColumns: ColumnsType<TUserBlockchainAction> = [
  {
    title: 'Blockchain',
    dataIndex: 'blockchain',
    key: 'blockchain',
  },
  {
    title: 'Method',
    dataIndex: 'method',
    key: 'method',
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
  },
];
