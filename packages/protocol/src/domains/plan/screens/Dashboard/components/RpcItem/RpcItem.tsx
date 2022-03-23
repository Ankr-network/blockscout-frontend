import React from 'react';
import classNames from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { NavLink } from 'ui';

import { useStyles } from './RpcItemStyles';
import { RpcItemProps } from './RpcItemTypes';
import { Button } from '@material-ui/core';

import { PlanRoutesConfig } from 'domains/plan/Routes';

export const RpcItem = ({
  logoSrc,
  name,
  description,
  period,
  links,
  extraDescription,
  extraLabel,
  className = '',
  hasOnClick = false,
  id,
}: RpcItemProps) => {
  const classes = useStyles({ hasOnClick });

  return (
    <NavLink
      isRouterLink
      href={PlanRoutesConfig.endpoint.generatePath(id)}
      disabled={!hasOnClick}
      className={classNames(classes.root, className)}
      tabIndex={0}
    >
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
        {hasOnClick && (
          <Button className={classes.moreBtn} variant="outlined">
            {t('providers.endpoint.more-btn')}
          </Button>
        )}
      </div>
    </NavLink>
  );
};
