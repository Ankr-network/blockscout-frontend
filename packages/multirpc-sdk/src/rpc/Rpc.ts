import { BaseRpc } from './BaseRpc';
import { MAX_BLOCK_HEIGHT_DIFFERENCE } from './const';

export class Rpc extends BaseRpc {
  public async validateNode(url: string): Promise<boolean> {
    try {
      const params = [
        { method: 'eth_chainId', id: 125, jsonrpc: '2.0' },
        { method: 'net_version', id: 126, jsonrpc: '2.0' },
        { method: 'eth_blockNumber', id: 127, jsonrpc: '2.0' },
      ];

      const {
        data: [
          { result: chainId },
          { result: netVersion },
          { result: blockNumber },
        ],
      } = await this.api.post('/', params);

      const {
        data: [
          { result: chainId2 },
          { result: netVersion2 },
          { result: blockNumber2 },
        ],
      } = await this.baseApi.post(url, params);

      let valid = true;

      if (chainId !== chainId2 || netVersion !== netVersion2) {
        valid = false;
      }

      if (Math.abs(blockNumber - blockNumber2) > MAX_BLOCK_HEIGHT_DIFFERENCE) {
        valid = false;
      }

      return valid;
    } catch {
      return false;
    }
  }
}
