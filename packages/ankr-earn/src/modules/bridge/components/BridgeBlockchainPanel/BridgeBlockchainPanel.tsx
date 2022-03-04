import { cloneElement, ReactText } from 'react';

import { t } from 'modules/i18n/utils/intl';

import { useBridgeBlockchainPanelStyles } from './useBridgeBlockchainPanelStyles';

export interface IBridgeBlockchainPanelItem {
  value: ReactText;
  label: string;
  icon: JSX.Element;
}

export interface IBridgeBlockchainPanelProps {
  direction: 'from' | 'to';
  value?: IBridgeBlockchainPanelItem['value'];
  items?: IBridgeBlockchainPanelItem[];
}

export const BridgeBlockchainPanel = ({
  direction,
  items = [],
  value,
}: IBridgeBlockchainPanelProps): JSX.Element => {
  const classes = useBridgeBlockchainPanelStyles();
  const title =
    direction === 'from' ? t('bridge.main.from') : t('bridge.main.to');

  const currentItem = items.find(item => item.value === value);

  return (
    <div className={classes.root}>
      {currentItem
        ? cloneElement(currentItem.icon, {
            className: classes.icon,
          })
        : null}

      <div>
        <div className={classes.title}>{title}</div>

        <div>{currentItem?.label}</div>
      </div>
    </div>
  );
};
