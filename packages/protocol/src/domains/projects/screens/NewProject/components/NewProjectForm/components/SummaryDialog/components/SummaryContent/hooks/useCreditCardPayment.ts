import { useCallback } from 'react';

import { useCardPayment } from 'domains/account/hooks/useCardPayment';
import { USDPaymentReason } from 'domains/projects/const';
import { useProjectConfig } from 'domains/projects/hooks/useProjectConfig';
import { NewProjectStep } from 'domains/projects/types';
import { WhitelistStepFields } from 'domains/projects/store';

export const useCreditCardPayment = (usdValue: string) => {
  const { handleFetchLinkForCardPayment } = useCardPayment();
  const { project, handleSetStepConfig } = useProjectConfig();

  return useCallback(async () => {
    const { data: url } = await handleFetchLinkForCardPayment(
      usdValue,
      USDPaymentReason.Whitelist,
    );

    handleSetStepConfig(
      NewProjectStep.Whitelist,
      {
        ...project[NewProjectStep.Whitelist],
        [WhitelistStepFields.isCheckedOut]: true,
      },
      NewProjectStep.Whitelist,
    );

    if (url) {
      window.location.href = url;
    }
  }, [handleFetchLinkForCardPayment, usdValue, handleSetStepConfig, project]);
};
