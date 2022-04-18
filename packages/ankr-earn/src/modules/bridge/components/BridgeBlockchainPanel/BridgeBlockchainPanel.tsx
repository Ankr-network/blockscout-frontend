import classNames from 'classnames';
import React, { cloneElement, ReactText, useState, useEffect } from 'react';

import { t } from 'modules/i18n/utils/intl';

import { ReactComponent as AngleDownIcon } from '../../../../assets/img/angle-down-icon.svg';

import { useBridgeBlockchainPanelStyles } from './useBridgeBlockchainPanelStyles';

export interface IBridgeBlockchainPanelItem {
  value: ReactText;
  label: string;
  icon: JSX.Element;
  disabled?: boolean;
}

export interface IBridgeBlockchainPanelProps {
  direction: 'from' | 'to';
  value?: IBridgeBlockchainPanelItem['value'];
  items?: IBridgeBlockchainPanelItem[];
  onClick: (item: IBridgeBlockchainPanelItem) => void;
}

export const BridgeBlockchainPanel = ({
  direction,
  items = [],
  value,
  onClick,
}: IBridgeBlockchainPanelProps): JSX.Element => {
  const classes = useBridgeBlockchainPanelStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [element, setElement] = useState<null | HTMLDivElement>();
  const title =
    direction === 'from' ? t('bridge.main.from') : t('bridge.main.to');

  const currentItem = items.find(item => item.value === value);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClickCheck = (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      if (element) {
        if (!element.contains(target)) {
          setIsOpen(false);
        }
      }
    };

    document.body.addEventListener('click', onClickCheck);

    return () => {
      document.body.removeEventListener('click', onClickCheck);
    };
  }, [element]);

  return (
    <div
      ref={mainElement => setElement(mainElement)}
      className={classes.root}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      {currentItem
        ? cloneElement(currentItem.icon, {
            className: classes.icon,
          })
        : null}

      <div>
        <div className={classes.title}>{title}</div>

        <div>{currentItem?.label}</div>
      </div>

      <div>
        <AngleDownIcon />
      </div>

      {isOpen ? (
        <div className={classes.list}>
          {items.map(item => {
            const isActive = item === currentItem;

            return (
              <div
                key={item.value}
                className={classNames(
                  classes.listItem,
                  isActive && classes.listItemActive,
                  item.disabled && classes.listItemDisalbed,
                )}
                role="button"
                tabIndex={0}
                onClick={(evt: React.MouseEvent<HTMLDivElement>) => {
                  evt.stopPropagation();
                  setIsOpen(false);
                  onClick(item);
                }}
              >
                {cloneElement(item.icon, {
                  className: classes.listItemIcon,
                })}

                {item.label}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};
