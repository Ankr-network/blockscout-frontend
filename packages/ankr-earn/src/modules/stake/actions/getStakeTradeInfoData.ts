import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { IStoreState } from 'store';

import { ONE, OPENOCEAN_CLASSIC_URL } from 'modules/common/const';
import { TStore } from 'modules/common/types/ReduxRequests';
import { withStore } from 'modules/common/utils/withStore';

import { MIN_STAKE_TRADE_INFO_DISCOUNT_VAL } from '../const';
import { EOpenOceanTokens } from '../types';

import { getStakeTradeInfoTokenPrice } from './getStakeTradeInfoTokenPrice';

type TGetStakeTradeInfoData = IGetStakeTradeInfoDataItem[] | null;

interface IGetStakeTradeInfoDataProps {
  baseToken: EOpenOceanTokens;
  bondToken: EOpenOceanTokens;
  certificateRatio: BigNumber;
  certificateToken: EOpenOceanTokens;
}

interface IGetStakeTradeInfoDataItem {
  discountPct: BigNumber;
  link: string;
  token: EOpenOceanTokens;
}

const getNetwork = (baseToken: EOpenOceanTokens): string => {
  switch (baseToken) {
    case EOpenOceanTokens.AVAX:
      return 'AVAX';

    case EOpenOceanTokens.BNB:
      return 'BSC';

    case EOpenOceanTokens.FTM:
      return 'FANTOM';

    case EOpenOceanTokens.ETH:
    case EOpenOceanTokens.MATIC:
    default:
      return 'ETH';
  }
};

const getLink = (
  baseToken: EOpenOceanTokens,
  targetToken: EOpenOceanTokens,
): string => {
  const network = getNetwork(baseToken);
  const base = (baseToken as unknown as string).toUpperCase();
  const target = (targetToken as unknown as string).toUpperCase();

  return `${OPENOCEAN_CLASSIC_URL}/${network}/${base}/${target}`;
};

export const getStakeTradeInfoData = createAction<
  RequestAction<TGetStakeTradeInfoData, TGetStakeTradeInfoData>,
  [IGetStakeTradeInfoDataProps]
>(
  'stake/getStakeTradeInfoData',
  ({
    baseToken,
    bondToken,
    certificateRatio,
    certificateToken,
  }): RequestAction => ({
    request: {
      promise: async ({
        dispatchRequest,
      }: TStore<IStoreState>): Promise<TGetStakeTradeInfoData> => {
        if (certificateRatio.isLessThanOrEqualTo(0)) {
          return null;
        }

        const rawData = await Promise.all([
          dispatchRequest(
            getStakeTradeInfoTokenPrice({
              baseToken,
              targetToken: bondToken,
            }),
          ),
          dispatchRequest(
            getStakeTradeInfoTokenPrice({
              baseToken,
              targetToken: certificateToken,
            }),
          ),
        ]);

        const data = rawData.reduce(
          (result, tokenData): IGetStakeTradeInfoDataItem[] => {
            if (!tokenData?.data) {
              return result;
            }

            const {
              outAmount,
              outToken: { symbol },
            } = tokenData.data;

            const tokenRatio =
              symbol === certificateToken ? certificateRatio : ONE;

            const discountPct = new BigNumber(outAmount)
              .minus(tokenRatio)
              .multipliedBy(100);

            if (discountPct.isLessThan(MIN_STAKE_TRADE_INFO_DISCOUNT_VAL)) {
              return result;
            }

            return [
              ...result,
              {
                discountPct,
                link: getLink(baseToken, symbol),
                token: symbol,
              } as IGetStakeTradeInfoDataItem,
            ];
          },
          [] as IGetStakeTradeInfoDataItem[],
        );

        if (!data.length) {
          return null;
        }

        return data;
      },
    },
    meta: {
      asMutation: false,
      showNotificationOnError: true,
      onRequest: withStore,
    },
  }),
);
