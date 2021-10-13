import React from 'react';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';

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
        className={classes.mainInfo}
        description={
          <div className={classes.description}>
            <ChainRequestsLabel
              description={description}
              descriptionColor="textSecondary"
              label={period}
              className={classes.descriptionItem}
            />
            <ChainRequestsLabel
              description={extraDescription}
              label={extraLabel}
              descriptionColor="textSecondary"
              className={classes.descriptionItem}
            />
          </div>
        }
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
