import { UserEndpoint } from 'domains/infrastructure/actions/fetchEndpoints';

export interface UserEndpointsProps {
  chainId: string;
  endpoints: UserEndpoint[];
  onSubmit: (updatedEndpoint?: UserEndpoint) => void;
  privateUrls: string[];
  publicUrls: string[];
}

export enum UserEndpointsFormFields {
  rpcLinks = 'rpcLinks',
}

export interface UserEndpointsFormData {
  rpcLinks: UserEndpoint[];
}
