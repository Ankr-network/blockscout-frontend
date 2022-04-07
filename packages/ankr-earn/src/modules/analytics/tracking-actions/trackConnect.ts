import { getBalances } from '../actions/getBalances';
import { IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface IConnectWalletEvent extends IBaseWaletData {
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

export const trackConnect = async (
  address: string,
  walletType: string,
): Promise<void> => {
  const balances = await getBalances();
  const properties: IConnectWalletEvent = {
    ...balances,
    walletType,
    walletPublicAddress: address,
  };

  trackAnalyticEvent({ event: 'connect_wallet', properties });
};
