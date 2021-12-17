import { useQuery } from '@redux-requests/react';
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
import { NavLink } from 'uiKit/NavLink';
import { ITableRow } from '../../../components/Table';
import { useStakeBtn } from './useStakeBtn';

const DECIMAL_PLACES = 4;

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
  } = useStakeBtn({ fromToken, toToken });

  const { data: getPricesData } = useQuery<IGetQuotePrice[] | null>({
    type: getPrices,
  });

  const data = useLocaleMemo(() => {
    const pricesData = getPricesData || [];
    const stakefiResultAmount = round(fairValue * amount);
    const linkToExchange = getExchangeLink(fromToken, toToken);

    const bestPrice = pricesData.reduce<number>((acc, item) => {
      if (item && acc < item.outAmount) {
        return item.outAmount;
      }
      return acc;
    }, stakefiResultAmount);

    const getPricesRows: ITableRow[] = pricesData.map(
      ({ inAmount, outAmount, exChange }) => {
        return {
          paltform: exChange,
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
      },
    );

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

    const sortedByRatioRows = [stakefiRow, ...getPricesRows].sort(
      (a, b) => +b.ratio - +a.ratio,
    );

    return sortedByRatioRows;
  }, [amount, fairValue, getPricesData, fromToken, toToken]);

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
