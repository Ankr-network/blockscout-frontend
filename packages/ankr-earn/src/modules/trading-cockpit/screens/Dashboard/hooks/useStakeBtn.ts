import { t } from 'modules/i18n/utils/intl';
import { RoutesConfig as StakePolygonRoutes } from 'modules/stake-polygon/Routes';
import { RoutesConfig as StakeRoutes } from 'modules/stake/Routes';
import { AvailableTokens } from 'modules/trading-cockpit/types';

const supportedBondTokens = [
  AvailableTokens.aETHb,
  AvailableTokens.aETHc,
  AvailableTokens.aMATICb,
  AvailableTokens.aAVAXb,
];

interface IUseStakeBtnArgs {
  fromToken: AvailableTokens;
  toToken: AvailableTokens;
}

export const useStakeBtn = ({ fromToken, toToken }: IUseStakeBtnArgs) => {
  let btnText = t('trading-cockpit.stake-btn');
  let disabled = false;
  let tooltip: string | undefined;

  const isBondTokenSelected = !!supportedBondTokens.find(
    token => token === fromToken,
  );

  if (isBondTokenSelected) {
    btnText = t('trading-cockpit.unstake-btn');
    disabled = true;

    if (fromToken === AvailableTokens.ETH || toToken === AvailableTokens.ETH) {
      tooltip = t('staker-dashboard.tip.eth-unstake-err');
    }
  }

  return {
    href: getStakeBtnPath(fromToken, toToken),
    disabled,
    btnText,
    tooltip,
  };
};

export const getStakeBtnPath = (
  fromToken: AvailableTokens,
  toToken: AvailableTokens,
): string => {
  if (fromToken === AvailableTokens.ETH || toToken === AvailableTokens.ETH) {
    // todo: add stake ETH path
    return StakeRoutes.main.generatePath();
  }

  if (
    fromToken === AvailableTokens.MATIC ||
    toToken === AvailableTokens.MATIC
  ) {
    return StakePolygonRoutes.stake.generatePath();
  }

  if (fromToken === AvailableTokens.AVAX || toToken === AvailableTokens.AVAX) {
    // todo: add stake AVAX path
    return StakeRoutes.main.generatePath();
  }

  return StakeRoutes.main.generatePath();
};
