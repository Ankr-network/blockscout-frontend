import { t, tHTML } from 'common';
import { IRPCCallsConfig } from 'domains/requestComposer/types/near';
import { NEARJavaScriptAPIConfig } from './NEARJavaScriptAPIConfig';

const BLOCK_ID_OR_HASH_INFO_URL =
  'https://docs.near.org/api/rpc/setup#using-block_id-param';
const FINALITY_INFO_URL =
  'https://docs.near.org/api/rpc/setup#using-finality-param';

const root = 'chain-item.request-composer.method-description.near.near-api-js';

export const RPC_CALLS_CONFIG: IRPCCallsConfig = {
  query: {
    description: tHTML(`${root}.query`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.query,
  },
  'query - view_access_key': {
    description: t(`${root}.query - view_access_key`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig['query - view_access_key'],
  },
  'query - view_access_key_list': {
    description: t(`${root}.query - view_access_key_list`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig['query - view_access_key_list'],
  },
  EXPERIMENTAL_changes: {
    description: t(`${root}.EXPERIMENTAL_changes`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.EXPERIMENTAL_changes,
  },
  'EXPERIMENTAL_changes - single_access_key_changes': {
    description: t(`${root}.EXPERIMENTAL_changes - single_access_key_changes`),
    NEARJavaScriptAPI:
      NEARJavaScriptAPIConfig[
        'EXPERIMENTAL_changes - single_access_key_changes'
      ],
  },
  'EXPERIMENTAL_changes - all_access_key_changes': {
    description: t(`${root}.EXPERIMENTAL_changes - all_access_key_changes`),
    NEARJavaScriptAPI:
      NEARJavaScriptAPIConfig['EXPERIMENTAL_changes - all_access_key_changes'],
  },
  'query - view_account': {
    description: t(`${root}.query - view_account`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig['query - view_account'],
  },
  'EXPERIMENTAL_changes - account_changes': {
    description: t(`${root}.EXPERIMENTAL_changes - account_changes`),
    NEARJavaScriptAPI:
      NEARJavaScriptAPIConfig['EXPERIMENTAL_changes - account_changes'],
  },
  'query - view_code': {
    description: t(`${root}.query - view_code`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig['query - view_code'],
  },
  'query - view_state': {
    description: t(`${root}.query - view_state`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig['query - view_state'],
  },
  'EXPERIMENTAL_changes - data_changes': {
    description: t(`${root}.EXPERIMENTAL_changes - data_changes`),
    NEARJavaScriptAPI:
      NEARJavaScriptAPIConfig['EXPERIMENTAL_changes - data_changes'],
  },
  'EXPERIMENTAL_changes - contract_code_changes': {
    description: t(`${root}.EXPERIMENTAL_changes - contract_code_changes`),
    NEARJavaScriptAPI:
      NEARJavaScriptAPIConfig['EXPERIMENTAL_changes - contract_code_changes'],
  },
  'query - call_function': {
    description: tHTML(`${root}.query - call_function`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig['query - call_function'],
  },
  block: {
    description: tHTML(`${root}.block`, {
      hashInfoURL: BLOCK_ID_OR_HASH_INFO_URL,
      finalityInfoURL: FINALITY_INFO_URL,
    }),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.block,
  },
  EXPERIMENTAL_changes_in_block: {
    description: tHTML(`${root}.EXPERIMENTAL_changes_in_block`, {
      hashInfoURL: BLOCK_ID_OR_HASH_INFO_URL,
      finalityInfoURL: FINALITY_INFO_URL,
    }),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.EXPERIMENTAL_changes_in_block,
  },
  chunk: {
    description: tHTML(`${root}.chunk`, {
      hashInfoURL: BLOCK_ID_OR_HASH_INFO_URL,
      finalityInfoURL: FINALITY_INFO_URL,
    }),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.chunk,
  },
  gas_price: {
    description: tHTML(`${root}.gas_price`, {
      hashInfoURL: BLOCK_ID_OR_HASH_INFO_URL,
    }),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.gas_price,
  },
  EXPERIMENTAL_genesis_config: {
    description: tHTML(`${root}.EXPERIMENTAL_genesis_config`, {
      hashInfoURL: BLOCK_ID_OR_HASH_INFO_URL,
      finalityInfoURL: FINALITY_INFO_URL,
    }),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.EXPERIMENTAL_genesis_config,
  },
  EXPERIMENTAL_protocol_config: {
    description: t(`${root}.EXPERIMENTAL_protocol_config`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.EXPERIMENTAL_protocol_config,
  },
  status: {
    disabled: true,
    description: t(`${root}.status`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.status,
  },
  network_info: {
    disabled: true,
    description: t(`${root}.network_info`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.network_info,
  },
  validators: {
    description: t(`${root}.validators`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.validators,
  },
  broadcast_tx_async: {
    description: t(`${root}.broadcast_tx_async`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.broadcast_tx_async,
  },
  broadcast_tx_commit: {
    description: t(`${root}.broadcast_tx_commit`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.broadcast_tx_commit,
  },
  tx: {
    description: tHTML(`${root}.tx`, {
      hashInfoURL: BLOCK_ID_OR_HASH_INFO_URL,
    }),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.tx,
  },
  EXPERIMENTAL_tx_status: {
    description: tHTML(`${root}.EXPERIMENTAL_tx_status`, {
      hashInfoURL: BLOCK_ID_OR_HASH_INFO_URL,
    }),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.EXPERIMENTAL_tx_status,
  },
  EXPERIMENTAL_receipt: {
    description: tHTML(`${root}.EXPERIMENTAL_receipt`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.EXPERIMENTAL_receipt,
  },
  EXPERIMENTAL_light_client_proof: {
    disabled: true,
    description: t(`${root}.EXPERIMENTAL_light_client_proof`),
    NEARJavaScriptAPI: NEARJavaScriptAPIConfig.EXPERIMENTAL_light_client_proof,
  },
};
