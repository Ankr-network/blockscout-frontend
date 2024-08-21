import { Checkbox } from 'modules/common/components/Checkbox';
import { FLARE_TESTNETS_GROUPS_LIST } from 'modules/endpoints/types';
import { FLARE_TESTNETS } from 'modules/chains/types';

import {
  UseGroupSelectorParams,
  useGroupSelector,
} from './hooks/useGroupSelector';

export type GroupSelectorProps = UseGroupSelectorParams;

export const GroupSelector = (props: GroupSelectorProps) => {
  const { isSelected, onChange } = useGroupSelector(props);

  const {
    group: { chainName, id, name },
  } = props;

  const isFlareTestnet =
    FLARE_TESTNETS_GROUPS_LIST.includes(id) ||
    // it's shity hack because of unexpected flare testnets dependencies and grouping
    // @ts-ignore
    FLARE_TESTNETS.includes(id);

  return (
    <Checkbox
      isChecked={isSelected}
      label={isFlareTestnet ? chainName : name}
      onChange={onChange}
      hasTreeView
    />
  );
};
