import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { ISlotAuctionConfig } from '@ankr.com/stakefi-polkadot/dist/types/config';
import { isMainnet } from 'modules/common/const';
import { BlockchainNetworkId } from 'modules/common/types';
import { Web3ModalKeyProvider } from './web3ModalKeyProvider';

export class SlotAuctionSdkSingleton {
  private static sdk?: SlotAuctionSdk;

  public static getInstance(config?: ISlotAuctionConfig): SlotAuctionSdk {
    if (SlotAuctionSdkSingleton.sdk) {
      return SlotAuctionSdkSingleton.sdk;
    }

    SlotAuctionSdkSingleton.sdk = new SlotAuctionSdk(
      new Web3ModalKeyProvider({
        expectedChainId: isMainnet
          ? BlockchainNetworkId.mainnet
          : BlockchainNetworkId.goerli,
      }),
      config,
    );

    return SlotAuctionSdkSingleton.sdk;
  }
}
