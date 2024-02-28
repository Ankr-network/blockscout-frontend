import { INTL_ROOT } from '../../../const';

export const INTL_PLAN_COMPARISON_ROOT = `${INTL_ROOT}.plan-comparison`;

export const PLAN_COMPARISON = [
  'public',
  'personal-free',
  'premium',
  'enterprise',
];

export const COLUMNS_COUNT = 21;
export const FIRST_COLUMNS_COUNT = 13;
export const FIRST_ROWS_INDEXES = Array.from(
  { length: FIRST_COLUMNS_COUNT },
  (a, b) => b + 1,
);
export const SECOND_COLUMNS_COUNT = COLUMNS_COUNT - FIRST_COLUMNS_COUNT;
export const SECOND_ROWS_INDEXES = Array.from(
  { length: SECOND_COLUMNS_COUNT },
  (a, b) => b + 1 + FIRST_COLUMNS_COUNT,
);
export const ROWS_COUNT = 4;

type RowNumber = number;

export interface IColumnHelper {
  text: RowNumber[];
  supported?: RowNumber[];
  emptyCell?: RowNumber[];
}

export const FEATURE_TABLE_ROW = new Array(ROWS_COUNT)
  .fill('')
  .map((_, index) => index);

export const mapTableItem = (item: number[], columnIndex: number) =>
  item.map(number => `${number}-${columnIndex}`);

type Columns = [IColumnHelper, IColumnHelper, IColumnHelper, IColumnHelper];

export const ROW_WITHOUT_BORDER_NUMBERS: RowNumber[] = [2, 14, 18];
export const SUB_ROW_NUMBERS: RowNumber[] = [3, 4, 15, 16, 17, 19, 20, 21];

export const COLUMNS_HELPER: Columns = [
  {
    text: [1, 3, 8, 13],
    emptyCell: [2, 4, 5, 6, 7, 9, 10, 11, 12, 14, 16, 17, 18, 19, 20, 21],
    supported: [15],
  },
  {
    text: [1, 3, 4, 5, 8, 13],
    emptyCell: [2, 6, 9, 10, 11, 12, 14, 16, 17, 18],
    supported: [7, 15, 19, 20, 21],
  },
  {
    text: [1, 3, 4, 5, 8, 13],
    emptyCell: [2, 10, 11, 12, 14, 18],
    supported: [6, 7, 9, 15, 16, 17, 19, 20, 21],
  },
  {
    text: [1, 3, 4, 5, 6, 7, 8, 13],
    emptyCell: [2, 14, 18],
    supported: [9, 10, 11, 12, 15, 16, 17, 19, 20, 21],
  },
];
