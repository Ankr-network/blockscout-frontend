import { web3ModalTheme } from 'modules/api/ProviderManagerSingleton';
import { ISlotAuctionConfig, SlotAuctionSdk } from 'polkadot';
import { EthereumWeb3KeyProvider } from 'provider/providerManager/providers/EthereumWeb3KeyProvider';

export class SlotAuctionSdkSingleton {
  private static sdk?: SlotAuctionSdk;

  public static async getInstance(
    config?: ISlotAuctionConfig,
  ): Promise<SlotAuctionSdk> {
    if (SlotAuctionSdkSingleton.sdk) {
      return SlotAuctionSdkSingleton.sdk;
    }

    SlotAuctionSdkSingleton.sdk = new SlotAuctionSdk(
      new EthereumWeb3KeyProvider({
        web3ModalTheme,
      }),
      config,
    );

    return SlotAuctionSdkSingleton.sdk;
  }
}
