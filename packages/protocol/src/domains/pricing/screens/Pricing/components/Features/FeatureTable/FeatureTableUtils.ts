import { EPlanLabel } from '../../PlanLabel';
import { EGeneralPlanList, EPlan } from '../../Plans/PlansUtils';

export const INTL_PLAN_COMPARISON_ROOT = `plan.plan-comparison`;

export type TPlan = 'public' | 'pay-as-you-go' | 'deal' | 'enterprise';

export const PLAN_COMPARISON: TPlan[] = [
  'public',
  'pay-as-you-go',
  'deal',
  'enterprise',
];

export const getPlanLabelByName = (plan: TPlan) => {
  if (plan === 'public') return EPlanLabel.FREE;
  if (plan === 'enterprise') return EPlanLabel.ENTERPRISE;

  return EPlanLabel.PREMIUM;
};

export const ROWS_COUNT = 24;
export const FIRST_ROWS_COUNT = 12;
export const FIRST_ROWS_INDEXES = Array.from(
  { length: FIRST_ROWS_COUNT },
  (_, b) => b + 1,
);
export const SECOND_ROWS_COUNT = 8;
export const SECOND_ROWS_INDEXES = Array.from(
  { length: SECOND_ROWS_COUNT },
  (_, b) => b + 1 + FIRST_ROWS_COUNT,
);
export const THIRD_ROWS_COUNT =
  ROWS_COUNT - FIRST_ROWS_COUNT - SECOND_ROWS_COUNT;
export const THIRD_ROWS_INDEXES = Array.from(
  { length: THIRD_ROWS_COUNT },
  (_, b) => b + 1 + FIRST_ROWS_COUNT + SECOND_ROWS_COUNT,
);
export const COLUMNS_COUNT = 4;

type RowNumber = number;

export interface IColumnHelper {
  text: RowNumber[];
  supported?: RowNumber[];
  emptyCell?: RowNumber[];
  button?: RowNumber[];
}

export const FEATURE_TABLE_COLUMNS = new Array(COLUMNS_COUNT)
  .fill('')
  .map((_, index) => index);

export const mapTableItem = (item: number[], columnIndex: number) =>
  item.map(number => `${number}-${columnIndex}`);

type Columns = [IColumnHelper, IColumnHelper, IColumnHelper, IColumnHelper];

export const ROW_WITHOUT_BORDER_NUMBERS: RowNumber[] = [2, 13, 17];
export const SUB_ROW_NUMBERS: RowNumber[] = [3, 4, 14, 15, 16, 18, 19, 20];

export const COLUMNS_HELPER: Columns = [
  {
    text: [1, 3, 4, 5, 7, 12, 32],
    emptyCell: [2, 6, 8, 9, 10, 11, 13, 15, 16, 17, 21, 22],
    supported: [14, 18, 19, 20],
    button: [24],
  },
  {
    text: [1, 3, 4, 5, 7, 12, 21, 22, 23],
    emptyCell: [2, 9, 10, 11, 13, 17],
    supported: [6, 8, 14, 15, 16, 18, 19, 20],
    button: [24],
  },
  {
    text: [1, 3, 4, 5, 7, 12, 21, 22, 23],
    emptyCell: [2, 9, 10, 11, 13, 17],
    supported: [6, 8, 14, 15, 16, 18, 19, 20],
    button: [24],
  },
  {
    text: [1, 3, 4, 5, 6, 7, 12, 21, 22, 23],
    emptyCell: [2, 13, 17],
    supported: [8, 9, 10, 11, 14, 15, 16, 18, 19, 20],
    button: [24],
  },
];

export const PLAN_COLUMNS = [
  EGeneralPlanList.Free,
  EGeneralPlanList.PayAsYouGo,
  EGeneralPlanList.Deal,
  EPlan.Enterprise,
];
