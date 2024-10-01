import {
  ChainID,
  ChainPath,
  isTestnetPremiumOnly,
} from '@ankr.com/chains-list';
import React, { Dispatch, SetStateAction } from 'react';

import { useGroupedEndpoints } from 'modules/endpoints/hooks/useGrouppedEndpoints';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ChainTypeSelectorWithSubchains } from '../ChainTypeSelectorWithSubchains';
import { chainTypeSelectorWithSubchainsTranslation } from './translation';
import { ProjectChain } from '../../types';

interface ISubchainSelectorsProps {
  chain: ProjectChain;
  selectedChainPaths: ChainPath[];
  setSelectedChainPaths: Dispatch<SetStateAction<ChainPath[]>>;
}

export const SubchainSelectors = ({
  chain,
  selectedChainPaths,
  setSelectedChainPaths,
}: ISubchainSelectorsProps) => {
  const endpoints = useGroupedEndpoints(chain, chain.id === ChainID.FLARE);
  const { hasPremium } = useAuth();
  const { keys, t } = useTranslation(chainTypeSelectorWithSubchainsTranslation);

  return (
    <>
      <ChainTypeSelectorWithSubchains
        chain={chain}
        setSelectedChainPaths={setSelectedChainPaths}
        selectedChainPaths={selectedChainPaths}
        subchains={chain.mainnets}
        endpoints={endpoints.mainnet}
        typeName={t(keys.mainnet)}
        hasPremiumColor={
          !hasPremium && !chain.premiumOnly && chain.isMainnetPremiumOnly
        }
      />
      <ChainTypeSelectorWithSubchains
        chain={chain}
        setSelectedChainPaths={setSelectedChainPaths}
        selectedChainPaths={selectedChainPaths}
        subchains={chain.testnets}
        endpoints={endpoints.testnet}
        typeName={t(keys.testnet)}
        hasPremiumColor={
          !hasPremium && !chain.premiumOnly && isTestnetPremiumOnly(chain)
        }
      />
      <ChainTypeSelectorWithSubchains
        chain={chain}
        setSelectedChainPaths={setSelectedChainPaths}
        selectedChainPaths={selectedChainPaths}
        subchains={chain.devnets}
        endpoints={endpoints.devnet}
        typeName={t(keys.devnet)}
      />
      <ChainTypeSelectorWithSubchains
        chain={chain}
        setSelectedChainPaths={setSelectedChainPaths}
        selectedChainPaths={selectedChainPaths}
        subchains={chain.beaconsMainnet}
        endpoints={endpoints.beaconsMainnet}
        typeName={t(keys.beaconsMainnet)}
        hasPremiumColor={!hasPremium && !chain.premiumOnly}
      />
      <ChainTypeSelectorWithSubchains
        chain={chain}
        setSelectedChainPaths={setSelectedChainPaths}
        selectedChainPaths={selectedChainPaths}
        subchains={chain.beaconsTestnet}
        endpoints={endpoints.beaconsTestnet}
        typeName={t(keys.beaconsTestnet)}
        hasPremiumColor={!hasPremium && !chain.premiumOnly}
      />
      <ChainTypeSelectorWithSubchains
        chain={chain}
        setSelectedChainPaths={setSelectedChainPaths}
        selectedChainPaths={selectedChainPaths}
        subchains={chain.opnodesMainnet}
        endpoints={endpoints.opnodesMainnet}
        typeName={t(keys.opnodesMainnet)}
        hasPremiumColor={!hasPremium && !chain.premiumOnly}
      />
      <ChainTypeSelectorWithSubchains
        chain={chain}
        setSelectedChainPaths={setSelectedChainPaths}
        selectedChainPaths={selectedChainPaths}
        subchains={chain.opnodesTestnet}
        endpoints={endpoints.opnodesTestnet}
        typeName={t(keys.opnodesTestnet)}
        hasPremiumColor={!hasPremium && !chain.premiumOnly}
      />
    </>
  );
};
