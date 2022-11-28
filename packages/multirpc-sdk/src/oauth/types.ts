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

export interface IEthUserAddress {
  address: string;
  type: EthAddressType;
  public_key?: string;
  publicKey?: string;
}

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
