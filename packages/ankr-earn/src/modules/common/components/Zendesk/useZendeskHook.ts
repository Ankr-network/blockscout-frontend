import { useCallback, useEffect, useState } from 'react';

export interface IUseZendeskHookArgs {
  zendeskKey: string;
  [key: string]: unknown;
}

export interface IUseZendeskData {
  isLoaded: boolean;
  onOpen: () => void;
  onHide: () => void;
  onShow: () => void;
}

export const ZENDESK_WIDGET_KEY = 'webWidget';
export const ZENDESK_SCRIPT_ID = 'ze-snippet';

export enum ZendeskActions {
  OPEN = 'open',
  SHOW = 'show',
  HIDE = 'hide',
  CLOSE = 'close',
  INDENTIFY = 'identify',
}

const isSSR = (): boolean =>
  typeof window === 'undefined' ||
  !window.document ||
  !window.document.createElement;

const ZENDESK_URL = 'https://static.zdassets.com/ekr/snippet.js';

export const useZendeskHook = ({
  zendeskKey,
  ...settings
}: IUseZendeskHookArgs): IUseZendeskData => {
  const [isLoaded, setLoaded] = useState(false);

  const zendeskAPI = useCallback((...args: unknown[]) => {
    if (!isSSR() && window.zE) {
      window.zE.apply(null, args);
    } else {
      // eslint-disable-next-line no-console
      console.warn('Zendesk is not initialized yet');
    }
  }, []);

  const handleLoaded = useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);

  const onHide = useCallback(() => {
    zendeskAPI(ZENDESK_WIDGET_KEY, ZendeskActions.HIDE);
  }, [zendeskAPI]);

  const onShow = useCallback(() => {
    zendeskAPI(ZENDESK_WIDGET_KEY, ZendeskActions.SHOW);
  }, [zendeskAPI]);

  const onOpen = useCallback(() => {
    zendeskAPI(ZENDESK_WIDGET_KEY, ZendeskActions.OPEN);
  }, [zendeskAPI]);

  useEffect(() => {
    if (isSSR() || window.zE) {
      return undefined;
    }

    const script = document.createElement('script');
    script.async = true;
    script.id = ZENDESK_SCRIPT_ID;
    script.src = `${ZENDESK_URL}?key=${zendeskKey}`;
    script.addEventListener('load', handleLoaded);
    document.body.appendChild(script);

    window.zESettings = settings;

    return () => {
      delete window.zE;
      delete window.zESettings;
    };
  }, [zendeskKey, settings, handleLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    onHide();
    zendeskAPI(`${ZENDESK_WIDGET_KEY}:on`, ZendeskActions.CLOSE, onHide);
    zendeskAPI(`${ZENDESK_WIDGET_KEY}:on`, ZendeskActions.OPEN, onShow);
  }, [isLoaded, zendeskAPI, onHide, onShow]);

  useEffect(() => {
    zendeskAPI(ZENDESK_WIDGET_KEY, ZendeskActions.INDENTIFY, {
      email: '',
      name: '',
    });
  }, [zendeskAPI]);

  return {
    isLoaded,
    onOpen,
    onShow,
    onHide,
  };
};
