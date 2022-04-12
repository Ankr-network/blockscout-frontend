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

class AnkrIntlBase {
  public readonly instance = new (intl as any).ReactIntlUniversal();

  public t(key: string, variables?: unknown): string {
    return this.instance.get(key, variables) || key;
  }

  public tHTML(key: string, variables?: unknown): string {
    return this.instance.getHTML(key, variables) || key;
  }

  public tHTMLWithRouter(key: string, variables?: unknown): ReactChild {
    return (
      <TextWithRouter>{this.instance.getHTML(key, variables)}</TextWithRouter>
    );
  }
}

export const AnkrIntl = new AnkrIntlBase();
