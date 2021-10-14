import React from 'react';
import { ProvidersHeader } from './components/ProvidersHeader';
import { ProvidersTable } from './components/ProvidersTable';

export const ProvidersList = () => {
  return (
    <>
      {/* TODO: add reusable component for ChainsHeader (/ankr-protocol-web/src/domains/chains/screens/Chains/components/ChainsHeader/ChainsHeader.tsx) and ProvidersHeader */}
      <ProvidersHeader />
      <ProvidersTable />
    </>
  );
};
