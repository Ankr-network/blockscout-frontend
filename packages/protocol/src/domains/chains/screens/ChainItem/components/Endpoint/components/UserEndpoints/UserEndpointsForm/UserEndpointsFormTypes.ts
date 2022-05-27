import { IUserEndpoint } from 'domains/nodeProviders/actions/fetchEndpoints';

export interface UserEndpointsProps {
  endpoints: IUserEndpoint[];
  chainId: string;
  onSubmit: (updatedEndpoint?: IUserEndpoint) => void;
  privateUrls: string[];
  publicUrls: string[];
}

export enum UserEndpointsFormFields {
  rpcLinks = 'rpcLinks',
}

export interface UserEndpointsFormData {
  rpcLinks: IUserEndpoint[];
}
