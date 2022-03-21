import { MAX_BLOCK_HEIGHT_DIFFERENCE } from './const';
import { Rpc } from './Rpc';

export class SolanaRpc extends Rpc {
  public async validateNode(url: string): Promise<boolean> {
    try {
      const params = [
        { method: 'getBlockHeight', id: 125, jsonrpc: '2.0' },
        { method: 'getHealth', id: 127, jsonrpc: '2.0' },
      ];

      const {
        data: [{ result: blockHeight }, { result: health }],
      } = await this.api.post('/', params);

      const {
        data: [{ result: blockHeight2 }, { result: health2 }],
      } = await this.baseApi.post(url, params);

      if (
        health !== health2 ||
        Math.abs(blockHeight - blockHeight2) > MAX_BLOCK_HEIGHT_DIFFERENCE
      ) {
        return false;
      }

      return true;
    } catch {
      return false;
    }
  }
}
