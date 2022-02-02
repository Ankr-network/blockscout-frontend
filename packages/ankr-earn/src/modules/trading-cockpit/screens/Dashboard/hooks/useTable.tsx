import { useQuery } from '@redux-requests/react';
import { DECIMAL_PLACES } from 'modules/common/const';
import { Percentage } from 'modules/common/types';
import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';
import { t } from 'modules/i18n/utils/intl';
import { getPrices } from 'modules/trading-cockpit/actions/getPrices';
import { IGetQuotePrice } from 'modules/trading-cockpit/actions/getQuotePrice';
import { PlatformLogo } from 'modules/trading-cockpit/components/PlatformLogo';
import { StakeBtn } from 'modules/trading-cockpit/components/StakeBtn';
import {
  AvailablePlatforms,
  AvailableTokens,
} from 'modules/trading-cockpit/types';
import { getExchangeLink } from 'modules/trading-cockpit/utils/getExchangeLink';
import { getExchangeName } from 'modules/trading-cockpit/utils/getExchangeName';
import { NavLink } from 'uiKit/NavLink';
import { ITableRow } from '../../../components/Table';
import { useStakeBtn } from './useStakeBtn';

interface IUseTableArgs {
  amount: number;
  fairValue: number;
  fromToken: AvailableTokens;
  toToken: AvailableTokens;
}
interface IUseTable {
  data: ITableRow[];
}

export const useTable = ({
  amount,
  fairValue,
  fromToken,
  toToken,
}: IUseTableArgs): IUseTable => {
  const {
    href: stakeBtnHref,
    disabled: stakeBtnDisabled,
    btnText: stakeBtnText,
    tooltip: stakeTooltip,
  } = useStakeBtn(fromToken);

  const { data: pricesData } = useQuery<IGetQuotePrice[] | null>({
    type: getPrices,
  });

  // todo: reduce the number of cycles with prices data, if possible
  const data = useLocaleMemo(() => {
    if (!pricesData) {
      return [];
    }

    const stakefiResultAmount = round(fairValue * amount);
    const linkToExchange = getExchangeLink(fromToken, toToken);

    // 1. get best price and OpenOcean price
    let bestPrice: number = stakefiResultAmount;
    let openOceanOutAmount: number = 0;
    for (const exchangeData of pricesData) {
      if (bestPrice < exchangeData.outAmount) {
        bestPrice = exchangeData.outAmount;
      }

      if (exchangeData.exChange === AvailablePlatforms.OpenOceanV2) {
        openOceanOutAmount = exchangeData.outAmount;
      }
    }

    // 2. check if you need to show open ocean
    let showOpenOcean = true;
    for (const { exChange, outAmount } of pricesData) {
      const isNotOpenOcean = exChange !== AvailablePlatforms.OpenOceanV2;
      const equalOutAmount = outAmount === openOceanOutAmount;
      if (isNotOpenOcean && equalOutAmount) {
        showOpenOcean = false;
      }
    }

    const stakefiRow: ITableRow = {
      paltform: t('trading-cockpit.platforms.stakefi'),
      iconSlot: <PlatformLogo name={AvailablePlatforms.StakeFi} />,
      ratio: fairValue,
      fairValue: getDiffVsFairValue(amount, stakefiResultAmount, fairValue),
      priceDiff: getEstPriceDiff(stakefiResultAmount, bestPrice, amount),
      youGet: stakefiResultAmount,
      btnSlot: (
        <StakeBtn
          href={stakeBtnHref}
          disabled={stakeBtnDisabled}
          tooltip={stakeTooltip}
        >
          {stakeBtnText}
        </StakeBtn>
      ),
    };

    const getPricesRows: ITableRow[] = [stakefiRow];

    // 3. set up rows data
    for (const { inAmount, outAmount, exChange } of pricesData) {
      const isOpenOcean = exChange === AvailablePlatforms.OpenOceanV2;

      if (isOpenOcean && !showOpenOcean) {
        continue;
      }

      const tableRow: ITableRow = {
        paltform: getExchangeName(exChange),
        iconSlot: <PlatformLogo name={exChange as AvailablePlatforms} />,
        ratio: getRatio(+inAmount, outAmount),
        fairValue: getDiffVsFairValue(+inAmount, outAmount, fairValue),
        priceDiff: getEstPriceDiff(outAmount, bestPrice, amount),
        youGet: round(outAmount),
        btnSlot: (
          <NavLink variant="outlined" fullWidth href={linkToExchange}>
            {t('trading-cockpit.exchange-btn')}
          </NavLink>
        ),
      };

      getPricesRows.push(tableRow);
    }

    // 4. sort by ratio
    const sortedByRatioRows = getPricesRows.sort((a, b) => +b.ratio - +a.ratio);

    return sortedByRatioRows;
  }, [amount, fairValue, pricesData, fromToken, toToken]);

  return {
    data,
  };
};

const getRatio = (inAmount: number, outAmount: number): number => {
  return round(outAmount / inAmount);
};

const getDiffVsFairValue = (
  inAmount: number,
  outAmount: number,
  fairValue: number,
) => {
  const min: Percentage = -100;
  const ratio = outAmount / inAmount;
  const result: Percentage = round((ratio - fairValue) * 100);
  return result < min ? min : result;
};

const getEstPriceDiff = (
  currentPrice: number,
  bestPrice: number,
  amount: number,
) => {
  const min: Percentage = -100;
  const result: Percentage = round(((currentPrice - bestPrice) / amount) * 100);
  return result < min ? min : result;
};

const round = (value: number) =>
  Math.round(value * 10 ** DECIMAL_PLACES) / 10 ** DECIMAL_PLACES;
