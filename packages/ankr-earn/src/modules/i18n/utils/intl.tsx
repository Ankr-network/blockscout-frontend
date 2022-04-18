import { ReactChild } from 'react';
import intl from 'react-intl-universal';

import { TextWithRouter } from 'modules/common/components/TextWithRouter';

/**
 * Should be imported from the 'common' package
 * @deprecated
 */
export function t(key: string, variables?: unknown): string {
  return intl.get(key, variables) || key;
}

/**
 * Should be imported from the 'common' package
 * @deprecated
 */
export function tHTML(key: string, variables?: unknown): string {
  return intl.getHTML(key, variables) || key;
}

/**
 * Should be imported from the 'common' package
 * @deprecated
 */
export function tHTMLWithRouter(key: string, variables?: unknown): ReactChild {
  return <TextWithRouter>{intl.getHTML(key, variables)}</TextWithRouter>;
}
