import { BlockchainID } from '../common';

export interface EnterpriseIsClientResponse {
  is_client: boolean;
}

interface EnterpriseBlockchain {
  blockchain: BlockchainID;
}

export interface EnterpriseClientEndpoint {
  api_key_id: string;
  enterprise_api_key: string;
  enterprise_api_key_name: string;
  blockchains?: EnterpriseBlockchain[];
}

export interface GetEnterpriseEndpointsResponse {
  api_keys: EnterpriseClientEndpoint[];
}
