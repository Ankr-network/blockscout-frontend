import { ClientMapped } from '../../store/clientsSlice';

export function sortData(
  rows: ClientMapped[],
  sortBy?: keyof ClientMapped,
  sortOrder?: 'asc' | 'desc',
) {
  const itemsToSort = [...rows];
  if (!sortBy || !sortOrder) {
    return rows;
  }
  const compareFn = (i: ClientMapped, j: ClientMapped): 1 | -1 | 0 => {
    if (!i[sortBy]) {
      return 1;
    }
    if (!j[sortBy]) {
      return -1;
    }
    if (i[sortBy]! < j[sortBy]!) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (i[sortBy]! > j[sortBy]!) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  };

  return itemsToSort.sort(compareFn);
}

export const columns: { key: keyof ClientMapped; label: string }[] = [
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Wallet' },
  { key: 'amount', label: 'Amount of Credits' },
  { key: 'voucherAmount', label: 'Amount of Voucher credits' },
  { key: 'amountAnkr', label: 'Amount of ANKR' },
  { key: 'amountUsd', label: 'Equivalent in USD' },
  { key: 'clientType', label: 'Type of the User' },
  { key: 'timestamp', label: 'Date Created' },
];
