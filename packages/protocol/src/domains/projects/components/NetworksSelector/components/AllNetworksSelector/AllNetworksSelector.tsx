import { t } from '@ankr.com/common';

import { Checkbox } from 'modules/common/components/Checkbox';

import {
  UseAllNetworksSelectorParams,
  useAllNetworksSelector,
} from './hooks/useAllNetworksSelector';

export interface AllNetworksSelectorProps
  extends UseAllNetworksSelectorParams {}

export const AllNetworksSelector = (props: AllNetworksSelectorProps) => {
  const { isIndeterminate, isSelected, onChange } =
    useAllNetworksSelector(props);

  return (
    <Checkbox
      hasBorderBottom
      hasPadding
      isChecked={isSelected}
      isIndeterminate={isIndeterminate}
      label={t('projects.new-project.chain-modal.select-all-label')}
      onChange={onChange}
    />
  );
};
