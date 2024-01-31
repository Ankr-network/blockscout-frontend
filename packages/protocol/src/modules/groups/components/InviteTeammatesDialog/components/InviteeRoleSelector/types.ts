import { SelectProps } from '@ankr.com/ui';

import { InviteeRole } from 'modules/groups/components/InviteTeammatesDialog/types';

export type OnChange = NonNullable<SelectProps<InviteeRole>['onChange']>;

export interface InviteeRoleSelectorProps {
  className?: string;
  onChange?: OnChange;
  value: InviteeRole;
}
