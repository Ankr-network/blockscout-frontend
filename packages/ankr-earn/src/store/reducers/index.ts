import { RouterState } from 'connected-react-router';
import { IDialogState } from '../dialogs/selectors';
import { IUserState } from './userReducer';
import { SidecarStatus } from 'modules/api/gateway';

interface ISidecar {
  status: SidecarStatus;
}

export interface ISidecars {
  items: ISidecar[];
}

interface IRequests {
  queries: { FETCH_CURRENT_PROVIDER_SIDECARS: { data: ISidecars } };
}

export interface IStoreState {
  router: RouterState;
  user: IUserState;
  dialog: IDialogState;
  requests: IRequests;
}
