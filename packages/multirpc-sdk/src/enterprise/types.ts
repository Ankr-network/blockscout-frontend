import { BlockchainID } from '../common';

export interface EnterpriseIsClientResponse {
  is_client: boolean;
}

interface EnterpriseBlockchain {
  blockchain: BlockchainID
}

export interface EnterpriseClientEndpoint {
  enterprise_api_key: string;
  blockchains?: EnterpriseBlockchain[]
}

export interface GetEnterpriseEndpointsResponse {
  api_keys: EnterpriseClientEndpoint[]
}
