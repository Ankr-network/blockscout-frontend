import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { INodesDetailEntity, INodeDetailEntity } from 'multirpc-sdk';

import { IContinentsCount } from './LocationsTableProps';

const PREMIUM_MULTIPLIER = 3;
const HUNDRED_PERCENT = 100;

export const getRows = (
  nodesDetail: INodesDetailEntity[],
  shouldShowRealNodesRatio: boolean,
): IContinentsCount[] => {
  if (!Array.isArray(nodesDetail) || nodesDetail.length === 0) return [];

  const nodes = nodesDetail[0]?.nodes;

  const formattedNodes = nodes.map((item: INodeDetailEntity) => {
    const { isPremium, location } = item;

    const { continent } = location;

    return {
      continent,
      isPremium,
    };
  });

  const continentsScore: IContinentsCount[] = [];

  formattedNodes.forEach(node => {
    const { continent, isPremium } = node;
    const continetScoreItem = {
      continent,
      isPremium: isPremium || false,
      freeCount: PREMIUM_MULTIPLIER,
      premiumCount: PREMIUM_MULTIPLIER,
      freePercent: '0',
      premiumPercent: '0',
      multiplier: 3,
    };

    const existContinentScoreItem = continentsScore.find(
      item => item.continent === continent,
    );

    if (existContinentScoreItem) {
      if (!existContinentScoreItem.isPremium) {
        existContinentScoreItem.freeCount += PREMIUM_MULTIPLIER;
      }

      existContinentScoreItem.premiumCount += PREMIUM_MULTIPLIER;

      existContinentScoreItem.isPremium = isPremium || false;
    } else {
      continentsScore.push(continetScoreItem);
    }
  });

  const maxScore = continentsScore.reduce(
    (acc, item) =>
      new BigNumber(acc).plus(item.freeCount).plus(item.premiumCount),
    new BigNumber(0),
  );

  return continentsScore.map(item => {
    const freeScore = new BigNumber(item.freeCount);
    const premiumScore = new BigNumber(item.premiumCount);

    const freePercent = shouldShowRealNodesRatio
      ? freeScore.div(maxScore).multipliedBy(HUNDRED_PERCENT)
      : freeScore
          .plus(premiumScore)
          .div(maxScore)
          .div(PREMIUM_MULTIPLIER)
          .multipliedBy(HUNDRED_PERCENT);

    const premiumPercent = shouldShowRealNodesRatio
      ? premiumScore.div(maxScore).multipliedBy(HUNDRED_PERCENT)
      : premiumScore
          .plus(freeScore)
          .div(maxScore)
          .multipliedBy(HUNDRED_PERCENT);

    return {
      ...item,
      continent: t(`continents.${item.continent}`),
      freePercent: `${freePercent.toFixed(0)}%`,
      premiumPercent: `${premiumPercent.toFixed(0)}%`,
      multiplier: shouldShowRealNodesRatio
        ? premiumPercent.dividedBy(freePercent).integerValue().toNumber()
        : 3,
    };
  });
};
