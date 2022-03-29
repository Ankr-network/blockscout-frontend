import React from 'react';

import { EndpointQuery } from './EndpointQuery';
import { SecuritySettingsQuery } from './SecuritySettingsQuery';

export const Endpoint = () => {
  return (
    <>
      <EndpointQuery />
      <SecuritySettingsQuery />
    </>
  );
};
