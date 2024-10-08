import React, { useCallback } from 'react';
import { UserEndpointToken } from 'multirpc-sdk';

export const useChainProjectsAccordionExpandedId = () => {
  const [expandedId, setExpandedId] = React.useState<
    UserEndpointToken | undefined
  >(undefined);

  const onToggleAccordion = useCallback((endpointToken: UserEndpointToken) => {
    setExpandedId(prevExpandedId =>
      prevExpandedId === endpointToken ? undefined : endpointToken,
    );
  }, []);

  return {
    expandedId,
    setExpandedId,
    onToggleAccordion,
  };
};
