export const intlRoot = 'plan.table';

export const HAS_TIP_MESSAGE = false;

type RowNumber = number;

export interface IColumnHelper {
  text: RowNumber[];
  tipMessage?: RowNumber[];
  supported?: RowNumber[];
  unsupported?: RowNumber[];
}

export const COLUMNS_COUNT = 3;

export const ROWS_COUNT = 10;

export const FEATURE_TABLE_ROW = new Array(ROWS_COUNT)
  .fill('')
  .map((_, index) => index);

export const mapTableItem = (item: number[], columnIndex: number) =>
  item.map(number => `${number}-${columnIndex}`);

type Columns = [IColumnHelper, IColumnHelper, IColumnHelper];

export const COLUMNS_HELPER: Columns = [
  {
    text: new Array(ROWS_COUNT).fill('').map((_, index) => index),
    tipMessage: [1, 3, 6, 10],
  },
  {
    text: [0, 7, 8, 9, 10],
    tipMessage: [0],
    supported: [1, 6],
    unsupported: [2, 3, 4, 5],
  },
  {
    text: [0, 7, 8, 9],
    supported: [1, 2, 3, 4, 5, 6],
  },
];
