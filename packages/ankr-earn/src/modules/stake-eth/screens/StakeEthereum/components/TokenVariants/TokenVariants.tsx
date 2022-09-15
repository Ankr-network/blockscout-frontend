import { tHTML, t } from 'common';

import { DEFAULT_FIXED } from 'modules/common/const';
import { Token } from 'modules/common/types/token';
import { TokenVariant } from 'modules/stake/components/TokenVariant';
import { TokenVariantList } from 'modules/stake/components/TokenVariantList';
import { AETHBIcon } from 'uiKit/Icons/AETHBIcon';
import { AETHCIcon } from 'uiKit/Icons/AETHCIcon';

import { useTokenVariants } from './useTokenVariants';

export const TokenVariants = (): JSX.Element => {
  const { tokenOut, isDisabled, isEthRatioLoading, ethRatio, onTokenSelect } =
    useTokenVariants();

  return (
    <TokenVariantList my={4}>
      <TokenVariant
        description={tHTML('stake-ethereum.aethb-descr')}
        iconSlot={<AETHBIcon />}
        isActive={tokenOut === Token.aETHb}
        isDisabled={isDisabled}
        title={t('unit.feth')}
        onClick={onTokenSelect(Token.aETHb)}
      />

      <TokenVariant
        description={tHTML('stake-ethereum.aethc-descr', {
          ethRate: isEthRatioLoading
            ? '...'
            : ethRatio.decimalPlaces(DEFAULT_FIXED).toFormat(),
        })}
        iconSlot={<AETHCIcon />}
        isActive={tokenOut === Token.aETHc}
        isDisabled={isDisabled}
        title={t('unit.aeth')}
        onClick={onTokenSelect(Token.aETHc)}
      />
    </TokenVariantList>
  );
};
