import { useMemo } from 'react';

import { ChainID } from 'domains/chains/types';
import { EndpointGroup } from 'modules/endpoints/types';
import { RequestComposer } from 'domains/requestComposer/components/composers';
import { isGroupEvmBased } from 'modules/endpoints/utils/isGroupEvmBased';

import {
  ConnectionSnippet,
  ConnectionSnippetProps,
} from './components/ConnectionSnippet';
import { MultiChainBenefits } from './components/MultichainBenefits';
import { UpgradeBanner } from './components/UpgradeBanner';
import { useGetStartedSectionStyles } from './GetStartedSectionStyles';
import { useChainProtocolContext } from '../../hooks/useChainProtocolContext';

export interface GetStartedSectionProps extends ConnectionSnippetProps {
  chainId: string;
  group: EndpointGroup;
  hasUpgradeBanner: boolean;
  publicUrl: string;
  hasRequestComposer: boolean;
  hasWssAccess?: boolean;
}

export const GetStartedSection = ({
  chainId,
  group,
  hasUpgradeBanner,
  publicUrl,
  hasRequestComposer,
  technology,
  setTechnology,
  httpCode,
  wssCode,
  hasWssAccess,
}: GetStartedSectionProps) => {
  const isMultiChain = chainId === ChainID.MULTICHAIN;
  const { isChainProtocolSwitchEnabled } = useChainProtocolContext();

  const { classes } = useGetStartedSectionStyles();

  const isEvmBased = useMemo(() => isGroupEvmBased(group), [group]);

  return (
    <div className={classes.getStartedSection}>
      {isMultiChain && <MultiChainBenefits />}
      {hasUpgradeBanner && !isMultiChain && <UpgradeBanner />}

      {!isChainProtocolSwitchEnabled && isEvmBased && (
        <ConnectionSnippet
          technology={technology}
          setTechnology={setTechnology}
          httpCode={httpCode}
          wssCode={hasWssAccess ? wssCode : undefined}
        />
      )}
      {!isChainProtocolSwitchEnabled && hasRequestComposer && (
        <RequestComposer
          group={group}
          publicUrl={publicUrl}
          chainId={chainId}
          className={classes.requestComposer}
        />
      )}
    </div>
  );
};
