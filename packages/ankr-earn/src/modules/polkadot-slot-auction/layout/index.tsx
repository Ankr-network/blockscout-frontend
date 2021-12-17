import React from 'react';
import { createWithLayout } from './utils/createWithLayout';

type LayoutCreator = <T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
) => // eslint-disable-next-line @typescript-eslint/ban-types
React.FC<T>;

export const withPolkadotSlotAuctionLayout: LayoutCreator = component =>
  createWithLayout(component, {});
