import { t } from '@ankr.com/common';
import BigNumber from 'bignumber.js';
import { INodesDetailEntity, INodeDetailEntity } from 'multirpc-sdk';
import { IContinentsCount } from './LocationsTableProps';

const PREMIUM_MULTIPLIER = 3;

export const getRows = (
  nodesDetail: INodesDetailEntity[],
): IContinentsCount[] => {
  if (!Array.isArray(nodesDetail) || nodesDetail.length === 0) return [];

  const nodes = nodesDetail[0]?.nodes;

  const formattedNodes = nodes.map((item: INodeDetailEntity) => {
    const { location, isPremium } = item;
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
      isPremium: isPremium ?? false,
      count: PREMIUM_MULTIPLIER,
      freePercent: '0',
      premiumPercent: '0',
    };

    const existContinentScoreItem = continentsScore.find(
      item => item.continent === continent,
    );

    if (existContinentScoreItem) {
      existContinentScoreItem.count += PREMIUM_MULTIPLIER;
      existContinentScoreItem.isPremium = isPremium ?? false;
    } else {
      continentsScore.push(continetScoreItem);
    }
  });

  const maxScore = continentsScore.reduce(
    (acc, item) => new BigNumber(acc).plus(item.count),
    new BigNumber(0),
  );

  const result = continentsScore.map(item => {
    const score = new BigNumber(item.count);

    const premiumPercent = score.div(maxScore).multipliedBy(100);

    return {
      ...item,
      continent: t(`continents.${item.continent}`),
      freePercent: `${premiumPercent.div(3).toFixed(0)}%`,
      premiumPercent: `${premiumPercent.toFixed(0)}%`,
    };
  });

  return result;
};
