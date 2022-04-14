import { IBaseRpcConfig } from './types';
import { IRpcGateway } from './interfaces';
import { NearRpc } from './NearRpc';
import { Network } from '../common';
import { Rpc } from './Rpc';
import { SolanaRpc } from './SolanaRpc';

export class RpcGateway implements IRpcGateway {
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
