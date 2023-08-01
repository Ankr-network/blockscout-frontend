import { AccountStatus } from 'domains/account/types';

export interface AccountMarkerProps {
  status: AccountStatus;
  className?: string;
}
