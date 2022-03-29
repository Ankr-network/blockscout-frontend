import { NearRpc } from './NearRpc';
import { SolanaRpc } from './SolanaRpc';
import { Network } from '../types';
import { IBaseRpcConfig } from './BaseRpc';
import { Rpc } from './Rpc';

export class RpcGateway {
  constructor(private readonly config: IBaseRpcConfig) {}

  private getBaseURL(network: Network) {
    return this.config.baseURL.replace('{blockchain}', network);
  }

  public getInstance(network: Network): Rpc {
    const params = {
      baseURL: this.getBaseURL(network),
    };

    switch (network) {
      case 'solana': {
        return new SolanaRpc(params);
      }
      case 'near': {
        return new NearRpc(params);
      }
      default: {
        return new Rpc(params);
      }
    }
  }
}
