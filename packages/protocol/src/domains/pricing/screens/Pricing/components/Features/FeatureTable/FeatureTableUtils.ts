export const intlRoot = 'plan.table';

export const HAS_TIP_MESSAGE = false;

export interface ITableHelper {
  text: number[];
  tipMessage?: number[];
  supported?: number[];
  unsupported?: number[];
}

export const FEATURE_TABLE_ROW = new Array(11)
  .fill('')
  .map((_, index) => index);

export const mapTableItem = (item: number[], columnIndex: number) =>
  item.map(number => `${number}-${columnIndex}`);

export const TABLE_HELPER: ITableHelper[] = [
  {
    text: new Array(11).fill('').map((_, index) => index),
    tipMessage: [1, 3, 6, 10],
  },
  {
    text: [0, 8, 9, 10],
    tipMessage: [0],
    supported: [1, 7],
    unsupported: [2, 3, 4, 5, 6],
  },
  {
    text: [0, 8, 9, 10],
    supported: [1, 2, 3, 4, 5, 6, 7],
  },
];
