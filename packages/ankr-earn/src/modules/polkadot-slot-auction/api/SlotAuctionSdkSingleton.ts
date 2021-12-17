import { SlotAuctionSdk } from '@ankr.com/stakefi-polkadot';
import { ISlotAuctionConfig } from '@ankr.com/stakefi-polkadot/dist/types/config';
import { Web3ModalKeyProvider } from 'modules/api/web3ModalKeyProvider';
import { isMainnet } from 'modules/common/const';
import { BlockchainNetworkId } from 'modules/common/types';

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
