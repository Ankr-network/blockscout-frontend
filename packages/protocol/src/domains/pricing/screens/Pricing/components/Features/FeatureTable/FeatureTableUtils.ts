import { INTL_ROOT } from '../../../const';

export const INTL_PLAN_COMPARISON_ROOT = `${INTL_ROOT}.plan-comparison`;

export const PLAN_COMPARISON = [
  'public',
  'personal-free',
  'premium',
  'enterprise',
];

export const COLUMNS_COUNT = 20;
export const FIRST_COLUMNS_COUNT = 12;
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

export const ROW_WITHOUT_BORDER_NUMBERS: RowNumber[] = [2, 13, 17];
export const SUB_ROW_NUMBERS: RowNumber[] = [3, 4, 14, 15, 16, 18, 19, 20];

export const COLUMNS_HELPER: Columns = [
  {
    text: [1, 3, 7, 12],
    emptyCell: [2, 4, 5, 6, 8, 9, 10, 11, 13, 15, 16, 17, 18, 19, 20],
    supported: [14],
  },
  {
    text: [1, 3, 4, 5, 7, 12],
    emptyCell: [2, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17],
    supported: [14, 18, 19, 20],
  },
  {
    text: [1, 3, 4, 5, 7, 12],
    emptyCell: [2, 8, 9, 10, 11, 13, 14, 17],
    supported: [6, 8, 14, 15, 16, 18, 19, 20],
  },
  {
    text: [1, 3, 4, 5, 6, 7, 12],
    emptyCell: [2, 13, 17],
    supported: [8, 9, 10, 11, 14, 15, 16, 18, 19, 20],
  },
];
