import { INTL_ROOT } from '../../../const';

export const INTL_PLAN_COMPARISON_ROOT = `${INTL_ROOT}.plan-comparison`;

export const PLAN_COMPARISON = [
  'public',
  'personal-free',
  'premium',
  'enterprise',
];

export const COLUMNS_COUNT = 21;
export const ROWS_COUNT = 4;

type RowNumber = number;

export interface IColumnHelper {
  text: RowNumber[];
  supported?: RowNumber[];
  unsupported?: RowNumber[];
  comingSoon?: RowNumber[];
}

export const FEATURE_TABLE_ROW = new Array(ROWS_COUNT)
  .fill('')
  .map((_, index) => index);

export const mapTableItem = (item: number[], columnIndex: number) =>
  item.map(number => `${number}-${columnIndex}`);

type Columns = [IColumnHelper, IColumnHelper, IColumnHelper, IColumnHelper];

export const COLUMNS_HELPER: Columns = [
  {
    text: [4, 5, 6, 9, 10],
    unsupported: [1, 2, 3, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    supported: [7, 8],
  },
  {
    supported: [1, 2, 7, 8],
    unsupported: [3, 11, 12, 13, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    text: [4, 5, 6, 9, 10],
  },
  {
    supported: [1, 2, 7, 8, 11, 12, 14, 16],
    comingSoon: [3, 13, 15],
    text: [4, 5, 6, 9, 10],
    unsupported: [17, 18, 19, 20, 21],
  },
  {
    supported: [1, 2, 3, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
    text: [4, 5, 6, 9, 10],
  },
];
