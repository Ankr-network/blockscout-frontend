import { ISelectOption } from 'uiKit/Select';

import { ABIItem } from 'domains/requestComposer/types';
import { getOptionLabel } from './getOptionLabel';

export const getOption = (item: ABIItem): ISelectOption => ({
  label: getOptionLabel(item),
  value: item.name ?? '',
});
