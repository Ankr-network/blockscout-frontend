import { INTEGRATED_JOINER, JOINER } from '../const';
import { TableVariant } from '../types';

const joinersMap: Record<TableVariant, string> = {
  [TableVariant.Default]: JOINER,
  [TableVariant.Integrated]: INTEGRATED_JOINER,
};

export const getJoiner = (variant: TableVariant) => joinersMap[variant];
