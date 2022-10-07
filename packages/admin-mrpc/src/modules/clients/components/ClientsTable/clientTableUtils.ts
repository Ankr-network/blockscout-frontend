import { ClientMapped } from '../../store/clientsSlice';

export function sortData({
  rows,
  compareType,
  sortBy,
  sortOrder,
}: {
  rows: ClientMapped[];
  compareType: 'string' | 'number';
  sortBy?: keyof ClientMapped;
  sortOrder?: 'asc' | 'desc';
}) {
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
    const a = compareType === 'number' ? +i[sortBy]! : i[sortBy]!;
    const b = compareType === 'number' ? +j[sortBy]! : j[sortBy]!;
    if (a < b) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a > b) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  };

  return itemsToSort.sort(compareFn);
}

type Key = keyof ClientMapped | 'options';

export const columns: { key: Key; label: string }[] = [
  { key: 'email', label: 'Email' },
  { key: 'address', label: 'Wallet' },
  { key: 'amount', label: 'Amount of Credits' },
  { key: 'voucherAmount', label: 'Amount of Voucher credits' },
  { key: 'amountAnkr', label: 'Amount of ANKR' },
  { key: 'amountUsd', label: 'Equivalent in USD' },
  { key: 'clientType', label: 'Type of the User' },
  { key: 'timestamp', label: 'Date Created' },
  { key: 'options', label: '' },
];
