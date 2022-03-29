import { MAX_BLOCK_HEIGHT_DIFFERENCE } from './const';
import { Rpc } from './Rpc';

export class NearRpc extends Rpc {
  public async validateNode(url: string): Promise<boolean> {
    try {
      const params = {
        method: 'EXPERIMENTAL_protocol_config',
        params: { finality: 'final' },
        id: 127,
        jsonrpc: '2.0',
      };

      const {
        data: {
          result: { chain_id: chainId, genesis_height: genesisHeight },
        },
      } = await this.api.post('/', params);

      const {
        data: {
          result: { chain_id: chainId2, genesis_height: genesisHeight2 },
        },
      } = await this.baseApi.post(url, params);

      if (
        chainId !== chainId2 ||
        Math.abs(genesisHeight - genesisHeight2) > MAX_BLOCK_HEIGHT_DIFFERENCE
      ) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
}
