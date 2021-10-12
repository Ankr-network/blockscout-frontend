import React from 'react';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';

import { useStyles } from './RpcItemStyles';
import { ChainsItemProps } from './RpcItemTypes';

export const RpcItem = ({
  logoSrc,
  name,
  description,
  period,
  chainLink,
  extraDescription,
  extraLabel,
  className = '',
}: ChainsItemProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <ChainMainInfo
        logoSrc={logoSrc}
        name={name}
        description={description}
        label={period}
        className={classes.mainInfo}
        extraDescription={extraDescription}
        extraLabel={extraLabel}
      />
      <div className={classes.right}>
        <CopyToClipIcon
          text={chainLink}
          message={t('common.copy-message')}
          textColor="textPrimary"
          className={classes.item}
        />
        <CopyToClipIcon
          text={chainLink}
          message={t('common.copy-message')}
          textColor="textPrimary"
          className={classes.item}
        />
      </div>
    </div>
  );
};
