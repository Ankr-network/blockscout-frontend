import BigNumber from 'bignumber.js';

import { MILLION_ANKR_TOKENS } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/components/AmountField';
import { WhiteListItem } from 'domains/projects/types';

import { NewProjectFormValues } from '../../../../NewProjectFormTypes';

export const PRICE_FOR_CONTRACT_USD = 10;
export const PRICE_FOR_CONTRACT_CREDITS = MILLION_ANKR_TOKENS * 100;

export const getCreditsAndUsdPrice = (contractsCount = 0) => {
  return {
    credits: new BigNumber(PRICE_FOR_CONTRACT_CREDITS).multipliedBy(
      contractsCount,
    ),
    usd: new BigNumber(PRICE_FOR_CONTRACT_USD).multipliedBy(contractsCount),
  };
};

export const getContractsCount = (values: NewProjectFormValues) => {
  return values.whitelistItems?.filter(
    item => item.type === WhiteListItem.address,
  ).length;
};
