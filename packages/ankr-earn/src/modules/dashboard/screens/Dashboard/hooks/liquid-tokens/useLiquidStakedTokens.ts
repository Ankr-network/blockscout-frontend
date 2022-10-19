import { useStakedAVAX } from './AVAX/useStakedAVAX';
import { useStakedBNB } from './BNB/useStakedBNB';
import { useBridgedETH } from './ETH/useBridgedETH';
import { useStakedETH } from './ETH/useStakedETH';
import { useStakedSSVOnETH } from './ETH/useStakedSSVOnETH';
import { useStakedFTM } from './FTM/useStakedFTM';
import { useBridgedMATIC } from './MATIC/useBridgedMATIC';
import { useStakedMATIC } from './MATIC/useStakedMATIC';
import { useStakedPolkadotTokens } from './Polkadot/useStakedPolkadotTokens';
import { useUnclaimedPolkadot } from './Polkadot/useUnclaimedPolkadot';

interface IUseLiquidStakedTokens {
  isUnclaimedDotBondShowed: boolean;
  isUnclaimedKsmBondShowed: boolean;
  isUnclaimedWndBondShowed: boolean;
  isUnclaimedEthBondShowed: boolean;
  isStakedEthBondShowed: boolean;
  isStakedEthCertShowed: boolean;
  isStakedMaticBondEthereumShowed: boolean;
  isStakedMaticCertEthereumShowed: boolean;
  isStakedMaticCertPolygonShowed: boolean;
  isStakedBnbBondShowed: boolean;
  isStakedBnbCertShowed: boolean;
  isStakedOldAEthShowed: boolean;
  isStakedFtmCertShowed: boolean;
  isStakedFtmBondShowed: boolean;
  isStakedAvaxBondShowed: boolean;
  isStakedAvaxCertShowed: boolean;
  isStakedDotBondShowed: boolean;
  isStakedWndBondShowed: boolean;
  isStakedKsmBondShowed: boolean;
  isStakedSSVOnETHCertShowed: boolean;
  isBridgedEthCertBscShowed: boolean;
  isBridgedEthBondBscShowed: boolean;
  isBridgedMaticBondPolygonShowed: boolean;
  isBridgedMaticBondBscShowed: boolean;
  isBridgedMaticCertBscShowed: boolean;
  isLiquidAssetsShowed: boolean;
  isStakedTokensLoading: boolean;
}

export const useLiquidStakedTokens = (): IUseLiquidStakedTokens => {
  const {
    isAvaxCommonLoading,
    isStakedAvaxBondShowed,
    isStakedAvaxCertShowed,
  } = useStakedAVAX();

  const {
    isEthCommonLoading,
    isStakedEthBondShowed,
    isStakedEthCertShowed,
    isUnclaimedEthBondShowed,
  } = useStakedETH();

  const {
    isBridgedEthBondBSCLoading,
    isBridgedEthBondBscShowed,
    isBridgedEthCertBSCLoading,
    isBridgedEthCertBscShowed,
  } = useBridgedETH();

  const { isSSVOnETHDataLoading, isStakedSSVOnETHCertShowed } =
    useStakedSSVOnETH();

  const {
    isMaticEthCommonLoading,
    isMaticPolygonCommonLoading,
    isStakedMaticBondEthereumShowed,
    isStakedMaticCertEthereumShowed,
    isStakedMaticCertPolygonShowed,
  } = useStakedMATIC();

  const {
    isBridgedMaticBondBscLoading,
    isBridgedMaticBondBscShowed,
    isBridgedMaticBondPolygonShowed,
    isBridgedMaticCertBscLoading,
    isBridgedMaticCertBscShowed,
  } = useBridgedMATIC();

  const {
    isBnbCommonLoading,
    isStakedBnbBondShowed,
    isStakedBnbCertShowed,
    isStakedOldAEthShowed,
  } = useStakedBNB();

  const { isFtmCommonLoading, isStakedFtmBondShowed, isStakedFtmCertShowed } =
    useStakedFTM();

  const {
    isStakedDotBondShowed,
    isStakedWndBondShowed,
    isStakedKsmBondShowed,
    isDotBondBalanceLoading,
    isKsmBondBalanceLoading,
    isWndBondBalanceLoading,
  } = useStakedPolkadotTokens();

  const {
    isUnclaimedDotBondShowed,
    isUnclaimedKsmBondShowed,
    isUnclaimedWndBondShowed,
    isUnclaimedDotBondLoading,
    isUnclaimedKsmBondLoading,
    isUnclaimedWndBondLoading,
  } = useUnclaimedPolkadot();

  const isStakedTokensLoading =
    isEthCommonLoading ||
    isMaticPolygonCommonLoading ||
    isBridgedEthCertBSCLoading ||
    isMaticEthCommonLoading ||
    isBnbCommonLoading ||
    isFtmCommonLoading ||
    isAvaxCommonLoading ||
    isDotBondBalanceLoading ||
    isWndBondBalanceLoading ||
    isKsmBondBalanceLoading ||
    isBridgedMaticBondBscLoading ||
    isBridgedMaticCertBscLoading ||
    isSSVOnETHDataLoading ||
    isUnclaimedDotBondLoading ||
    isUnclaimedKsmBondLoading ||
    isUnclaimedWndBondLoading ||
    isUnclaimedWndBondLoading ||
    isBridgedEthBondBSCLoading;

  const liquidAssetsState = {
    isUnclaimedDotBondShowed,
    isUnclaimedKsmBondShowed,
    isUnclaimedWndBondShowed,
    isUnclaimedEthBondShowed,

    isStakedEthBondShowed,
    isStakedEthCertShowed,
    isStakedMaticBondEthereumShowed,
    isStakedMaticCertEthereumShowed,
    isStakedBnbBondShowed,
    isStakedBnbCertShowed,
    isStakedOldAEthShowed,
    isStakedFtmCertShowed,
    isStakedFtmBondShowed,
    isStakedAvaxBondShowed,
    isStakedAvaxCertShowed,
    isStakedDotBondShowed,
    isStakedWndBondShowed,
    isStakedKsmBondShowed,
    isStakedSSVOnETHCertShowed,

    isBridgedEthCertBscShowed,
    isBridgedEthBondBscShowed,
    isBridgedMaticBondPolygonShowed,
    isStakedMaticCertPolygonShowed,
    isBridgedMaticBondBscShowed,
    isBridgedMaticCertBscShowed,
  };

  const isLiquidAssetsShowed = Object.keys(liquidAssetsState).reduce(
    (acc, key) => {
      const isShowed = (liquidAssetsState as Record<string, boolean>)[key];
      return acc || isShowed;
    },
    false,
  );

  return {
    ...liquidAssetsState,
    isLiquidAssetsShowed,
    isStakedTokensLoading,
  };
};
