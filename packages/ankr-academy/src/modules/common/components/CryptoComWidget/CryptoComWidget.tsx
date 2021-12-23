import React from 'react';
import useScript from 'react-script-hook';
import { CRYPTO_WIDGET_SCRIPT_SRC } from '../../../layout/components/Footer/links';

interface ICryptoComWidgetProps {
  className?: string;
}

const CRYPTO_WIDGET_PARAMS = {
  script: {
    src: CRYPTO_WIDGET_SCRIPT_SRC,
    checkForExisting: true,
  },
  attributes: {
    id: 'crypto-widget-CoinList',
    'data-transparent': true,
    'data-coins': 'ankr',
  },
};

export const CryptoComWidget = ({ className }: ICryptoComWidgetProps) => {
  useScript(CRYPTO_WIDGET_PARAMS.script);

  return <div className={className} {...CRYPTO_WIDGET_PARAMS.attributes} />;
};
