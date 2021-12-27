import { Locale } from 'modules/common/types';
import { RequestStatus } from 'modules/common/utils/requestStatus';

export interface IUserState {
  connectStatus: RequestStatus;
  disconnectStatus: RequestStatus;
  isConnected: boolean;
  isConnectionAvailable: boolean;
  providerAccessToken?: string;
  locale: Locale;
  chainId: number | undefined;
}
