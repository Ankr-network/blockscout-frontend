import { UserGroupItemMapped } from 'modules/groups/actions/getUserGroups';

type Key = keyof UserGroupItemMapped;
export const columns: { key: Key; label: string }[] = [
  { key: 'groupName', label: 'Group Name' },
  { key: 'groupAddress', label: 'Group Address' },
];
