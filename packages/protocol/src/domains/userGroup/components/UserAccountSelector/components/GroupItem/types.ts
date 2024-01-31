import { UserGroup } from 'multirpc-sdk';

export interface GroupItemProps {
  group: UserGroup;
  onSelect: () => void;
}
