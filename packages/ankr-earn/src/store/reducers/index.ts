import { SidecarStatus } from 'modules/api/gateway';

interface ISidecar {
  status: SidecarStatus;
}

export interface ISidecars {
  items: ISidecar[];
}
