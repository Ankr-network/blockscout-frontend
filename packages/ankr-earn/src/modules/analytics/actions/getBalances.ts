import {
  PolygonSDK,
  BinanceSDK,
  EthereumSDK,
  AvalancheSDK,
} from '@ankr.com/staking-sdk';

import { FantomSDK } from 'modules/stake-fantom/api/sdk';

interface IGetBalances {
  ethAmount?: string;
  avaxAmount?: string;
  maticAmount?: string;
  ftmAmount?: string;
  bnbAmount?: string;
  aethbAmount?: string;
  aavaxbAmount?: string;
  amaticbAmount?: string;
  aftmbAmount?: string;
  abnbbAmount?: string;
}

export const getBalances = async (): Promise<IGetBalances> => {
  const [binanceSDK, avalancheSDK, ethSDK, polygonSDK, fantomSDK] =
    await Promise.all([
      BinanceSDK.getInstance(),
      AvalancheSDK.getInstance(),
      EthereumSDK.getInstance(),
      PolygonSDK.getInstance(),
      FantomSDK.getInstance(),
    ]);

  const [
    bnbBalance,
    abnbBalance,
    avaxBalance,
    aavaxbBalance,
    fethBalance,
    ethBalance,
    maticBalance,
    amaticbBalance,
    ftmBalance,
    aftmbBalance,
  ] = await Promise.all([
    binanceSDK.getBNBBalance(),
    binanceSDK.getABBalance(),
    avalancheSDK.getAVAXBalance(),
    avalancheSDK.getABBalance(),
    ethSDK.getABBalance(),
    ethSDK.getEthBalance(),
    polygonSDK.getMaticBalance(),
    polygonSDK.getABBalance(),
    fantomSDK.getFtmBalance(),
    fantomSDK.getABBalance(),
  ]);

  return {
    bnbAmount: bnbBalance.toFixed(),
    abnbbAmount: abnbBalance.toFixed(),
    avaxAmount: avaxBalance.toFixed(),
    aavaxbAmount: aavaxbBalance.toFixed(),
    ethAmount: ethBalance.toFixed(),
    aethbAmount: fethBalance.toFixed(),
    maticAmount: maticBalance.toFixed(),
    amaticbAmount: amaticbBalance.toFixed(),
    ftmAmount: ftmBalance.toFixed(),
    aftmbAmount: aftmbBalance.toFixed(),
  };
};
