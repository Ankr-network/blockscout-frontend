import { useMemo } from 'react';

import { PRIMARY_TOKEN_INDEX } from 'domains/jwtToken/utils/utils';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

export const useProjectName = (
  userEndpointToken: string,
  tokenIndex: number,
) => {
  const shouldShowTooltip = tokenIndex === PRIMARY_TOKEN_INDEX;

  const copyText = useMemo(
    () => shrinkAddress(userEndpointToken),
    [userEndpointToken],
  );

  return {
    copyText,
    shouldShowTooltip,
  };
};
