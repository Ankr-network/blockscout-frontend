import React from 'react';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';

import { useStyles } from './RpcItemStyles';
import { RpcItemProps } from './RpcItemTypes';

export const RpcItem = ({
  logoSrc,
  name,
  description,
  period,
  links,
  extraDescription,
  extraLabel,
  className = '',
}: RpcItemProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root, className)}>
      <ChainMainInfo
        logoSrc={logoSrc}
        name={name}
        className={classes.mainInfo}
        description={
          description && (
            <div className={classes.description}>
              <ChainRequestsLabel
                description={description}
                descriptionColor="textSecondary"
                label={period}
                className={classes.descriptionItem}
              />
              {extraDescription && (
                <ChainRequestsLabel
                  description={extraDescription}
                  label={extraLabel}
                  descriptionColor="textSecondary"
                  className={classes.descriptionItem}
                />
              )}
            </div>
          )
        }
      />
      <div className={classes.right}>
        {links.map(link => (
          <CopyToClipIcon
            text={link}
            message={t('common.copy-message')}
            key={link}
            textColor="textPrimary"
            className={classes.item}
          />
        ))}
      </div>
    </div>
  );
};
