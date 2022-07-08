import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { AETHC_ABI } from '@ankr.com/staking-sdk';

import { configFromEnv } from 'modules/api/config';
import { currentEnv, ETH_SCALE_FACTOR } from 'modules/common/const';
import { Env } from 'modules/common/types';
import { singleton } from 'modules/common/utils/Singleton';

@singleton
export class ETHHttpProviderSingleton {
  private aETHcContract;

  constructor() {
    const ethHttpProviderUrl = this.getEthHttpProviderUrl();
    const config = configFromEnv();
    const web3 = new Web3(ethHttpProviderUrl);

    this.aETHcContract = new web3.eth.Contract(
      AETHC_ABI as AbiItem[],
      config.contractConfig.aethContract,
    );
  }

  public async getAETHCRatio(): Promise<BigNumber> {
    const aETHcRatio: string = await this.aETHcContract.methods.ratio().call();

    return new BigNumber(aETHcRatio).div(ETH_SCALE_FACTOR);
  }

  private getEthHttpProviderUrl(): string {
    switch (currentEnv) {
      case Env.Production:
        return 'https://rpc.ankr.com/eth';

      default:
        // todo: use ankr rpc in the future
        return 'https://apis.ankr.com/febd3f2636cc4a779c4cc92bb9d65be1/fabcaa58c11a8dac4b7de405f793bb65/eth/fast/goerli';
    }
  }
}
