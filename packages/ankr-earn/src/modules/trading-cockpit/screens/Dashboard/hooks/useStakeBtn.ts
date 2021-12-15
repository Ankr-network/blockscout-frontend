import { t } from 'modules/i18n/utils/intl';
import { AvailableTokens } from 'modules/trading-cockpit/types';

// todo: get relevant links
const DEMO_PATH = '/';
const FEATURES_PATH = DEMO_PATH;
const STAKER_PATH = DEMO_PATH;
const MATIC_PATH = DEMO_PATH;

const supportedBondTokens = [
  AvailableTokens.aETHb,
  AvailableTokens.aETHc,
  AvailableTokens.aMATICb,
];

interface IUseStakeBtnArgs {
  fromToken: AvailableTokens;
  toToken: AvailableTokens;
}

export const useStakeBtn = ({ fromToken, toToken }: IUseStakeBtnArgs) => {
  let btnText = t('trading-cockpit.stake-btn');
  let disabled = false;
  let tooltip: string | undefined;

  const isUnstakeType = !!supportedBondTokens.find(
    token => token === fromToken,
  );

  if (isUnstakeType) {
    btnText = t('trading-cockpit.unstake-btn');
    disabled = true;
  }

  if (
    isUnstakeType &&
    (fromToken === AvailableTokens.ETH || toToken === AvailableTokens.ETH)
  ) {
    tooltip = t('trading-cockpit.eth-unstake-err');
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
    return STAKER_PATH;
  } else if (
    fromToken === AvailableTokens.MATIC ||
    toToken === AvailableTokens.MATIC
  ) {
    return MATIC_PATH;
  }

  return FEATURES_PATH;
};
