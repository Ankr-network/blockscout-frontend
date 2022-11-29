export interface IOauthLoginParams {
  client_id: string;
  oauth_url: string;
  redirect_url: string;
  scopes: string;
  state: string;
}

export interface ISecreteCodeLoginParams {
  secret_code: string;
  state: string;
}

export interface IOauthLoginResponse {
  access_token: string;
  expires_at: number;
}

export enum EthAddressType {
  User = 'ETH_ADDRESS_TYPE_USER',
  Generated = 'ETH_ADDRESS_TYPE_GENERATED',
}

export interface IEthUserAddressWithDeprecatedPublicKey {
  address: string;
  type: EthAddressType;
  //TODO: remove snake_case after this tasks: https://ankrnetwork.atlassian.net/browse/MRPC-1922 https://ankrnetwork.atlassian.net/browse/MRPC-1923
  public_key?: string; // deprecated. will be used only camelCase for publicKey. now is used by accounting gateway in user/addresses/api/v1/auth/googleOauth/getAllMyEthAddresses
  publicKey?: string; // used for backoffice GetUserAddressesResponse
}
export type IEthUserAddress = Omit<IEthUserAddressWithDeprecatedPublicKey, 'publicKey'>

export interface IETHAddressesResponse {
  addresses: IEthUserAddress[];
}

export interface IDecodeJwtTokenParams {
  address: string;
  data_hex: string;
}

export interface IDecodeJwtTokenResponse {
  decrypted_data_hex: string;
}
