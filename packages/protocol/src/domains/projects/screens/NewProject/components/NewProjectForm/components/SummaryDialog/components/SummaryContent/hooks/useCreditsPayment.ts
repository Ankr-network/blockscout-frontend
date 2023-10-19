import { useCallback } from 'react';

import { useEnableWhitelist } from 'domains/projects/hooks/useEnableWhitelist';
import { NewProjectStep } from 'domains/projects/types';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { WhitelistStepFields } from 'domains/projects/store';

import { useWhitelistStepOnSubmit } from '../../../../../hooks/useWhitelistStepOnSubmit';

export const useCreditsPayment = (userEndpointToken?: string) => {
  const handleWhitelistStepOnSubmit = useWhitelistStepOnSubmit();
  const { handleEnableWhitelist } = useEnableWhitelist();
  const { project, handleSetStepConfig } = useProjectConfig();

  return useCallback(async () => {
    handleSetStepConfig(
      NewProjectStep.Whitelist,
      {
        ...project[NewProjectStep.Whitelist],
        [WhitelistStepFields.isCheckedOut]: true,
      },
      NewProjectStep.Whitelist,
    );

    await handleWhitelistStepOnSubmit(userEndpointToken);

    await handleEnableWhitelist(false);
  }, [
    handleWhitelistStepOnSubmit,
    handleEnableWhitelist,
    userEndpointToken,
    handleSetStepConfig,
    project,
  ]);
};
