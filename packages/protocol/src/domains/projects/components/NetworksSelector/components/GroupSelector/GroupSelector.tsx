import { Checkbox } from 'domains/projects/components/Checkbox';

import {
  UseGroupSelectorParams,
  useGroupSelector,
} from './hooks/useGroupSelector';

export type GroupSelectorProps = UseGroupSelectorParams;

export const GroupSelector = (props: GroupSelectorProps) => {
  const { isSelected, onChange } = useGroupSelector(props);

  const {
    group: { name },
  } = props;

  return (
    <Checkbox
      isChecked={isSelected}
      label={name}
      onChange={onChange}
      hasTreeView
    />
  );
};
