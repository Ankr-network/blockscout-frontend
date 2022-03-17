import React, { ReactChild } from 'react';
import intl from 'react-intl-universal';

import { TextWithRouter } from '../components/TextWithRouter';

export function t(key: string, variables?: unknown): string {
  return intl.get(key, variables) || key;
}

export function tHTML(key: string, variables?: unknown): string {
  return intl.getHTML(key, variables) || key;
}

export function tHTMLWithRouter(key: string, variables?: unknown): ReactChild {
  return <TextWithRouter>{intl.getHTML(key, variables)}</TextWithRouter>;
}
