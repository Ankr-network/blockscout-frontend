import { ConnectConfig, keyStores } from 'near-api-js';

export enum NearLibraryID {
  NEARJavaScriptAPI = 'NEARJavaScriptAPI',
}

export const NearLibrary = {
  [NearLibraryID.NEARJavaScriptAPI]: 'NEAR JavaScript API',
};

export enum NearMethod {
  'EXPERIMENTAL_changes - account_changes' = 'EXPERIMENTAL_changes - account_changes',
  'EXPERIMENTAL_changes - all_access_key_changes' = 'EXPERIMENTAL_changes - all_access_key_changes',
  'EXPERIMENTAL_changes - contract_code_changes' = 'EXPERIMENTAL_changes - contract_code_changes',
  'EXPERIMENTAL_changes - data_changes' = 'EXPERIMENTAL_changes - data_changes',
  'EXPERIMENTAL_changes - single_access_key_changes' = 'EXPERIMENTAL_changes - single_access_key_changes',
  'EXPERIMENTAL_changes' = 'EXPERIMENTAL_changes',
  'EXPERIMENTAL_changes_in_block' = 'EXPERIMENTAL_changes_in_block',
  'EXPERIMENTAL_genesis_config' = 'EXPERIMENTAL_genesis_config',
  // ? Not in Near RPC docs: https://github.com/near/NEPs/blob/master/specs/ChainSpec/LightClient.md#light-client-proof
  'EXPERIMENTAL_light_client_proof' = 'EXPERIMENTAL_light_client_proof',
  'EXPERIMENTAL_protocol_config' = 'EXPERIMENTAL_protocol_config',
  'EXPERIMENTAL_receipt' = 'EXPERIMENTAL_receipt',
  'EXPERIMENTAL_tx_status' = 'EXPERIMENTAL_tx_status',
  'block' = 'block',
  'broadcast_tx_async' = 'broadcast_tx_async',
  'broadcast_tx_commit' = 'broadcast_tx_commit',
  'chunk' = 'chunk',
  'gas_price' = 'gas_price',
  'network_info' = 'network_info',
  'query - call_function' = 'query - call_function',
  'query - view_access_key' = 'query - view_access_key',
  'query - view_access_key_list' = 'query - view_access_key_list',
  'query - view_account' = 'query - view_account',
  'query - view_code' = 'query - view_code',
  'query - view_state' = 'query - view_state',
  'query' = 'query',
  'status' = 'status',
  'tx' = 'tx',
  'validators' = 'validators',
}

export const getNearConnectionConfig = (nodeUrl: string): ConnectConfig => ({
  networkId: 'mainnet',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl,
  walletUrl: 'https://wallet.mainnet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
});
