import { useEffect, useMemo } from 'react';

import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep, WhiteListItem } from 'domains/projects/types';
import { useBalance } from 'domains/account/hooks/useBalance';

import { useEnableWhitelist } from './useEnableWhitelist';
import { getCreditsAndUsdPrice } from '../screens/NewProject/components/NewProjectForm/components/SummaryDialog/components/SummaryContent/SummaryContentUtils';
import { NewProjectType } from '../store';

const creditsPriceForContracts = (project: NewProjectType) => {
  const smartContractCount = project?.[
    NewProjectStep.Whitelist
  ]?.whitelistItems?.filter(
    item => item.type === WhiteListItem.address,
  )?.length;

  const { credits } = getCreditsAndUsdPrice(smartContractCount);

  return credits;
};

export const useEnableWhitelistedProject = (hasReason: boolean) => {
  const { project = {} } = useProjectConfig();

  const { handleEnableWhitelist, isLoading, userEndpointToken } =
    useEnableWhitelist();

  const { creditBalance } = useBalance({
    options: { pollingInterval: 10_000 },
  });

  const isBalanceMoreThanPriceForContracts = useMemo(
    () => creditsPriceForContracts(project).isLessThanOrEqualTo(creditBalance),
    [project, creditBalance],
  );

  useEffect(() => {
    const isCheckedOut = project?.[NewProjectStep.Whitelist]?.isCheckedOut;

    if (isCheckedOut && hasReason && isBalanceMoreThanPriceForContracts) {
      handleEnableWhitelist();
    }
  }, [
    handleEnableWhitelist,
    project,
    hasReason,
    isBalanceMoreThanPriceForContracts,
  ]);

  return {
    isLoading: isLoading || !isBalanceMoreThanPriceForContracts,
    userEndpointToken,
  };
};
