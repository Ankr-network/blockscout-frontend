import { EthereumWeb3KeyProvider } from '@ankr.com/provider';
import { alpha, lighten } from '@material-ui/core';
import { ThemeColors } from 'web3modal';

import { ISlotAuctionConfig, SlotAuctionSdk } from 'polkadot';
import { mainTheme } from 'ui';

export const web3ModalTheme: ThemeColors = {
  background: mainTheme.palette.background.paper,
  main: mainTheme.palette.text.primary,
  secondary: alpha(mainTheme.palette.text.primary, 0.5),
  border: mainTheme.palette.background.default,
  hover: lighten(mainTheme.palette.background.default, 0.2),
};

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
