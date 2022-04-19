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

import { ChainsRoutesConfig } from 'domains/chains/Routes';

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

  const urls = links.flatMap<string>(({ rpc, ws }) => (ws ? [rpc, ws] : [rpc]));

  return (
    <NavLink
      isRouterLink
      href={ChainsRoutesConfig.chainDetails.generatePath(id)}
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
        <div className={classes.endpointsList}>
          {urls.slice(0, 2).map(url => (
            <CopyToClipIcon
              text={url}
              message={t('common.copy-message')}
              key={url}
              textColor="textPrimary"
              className={classes.item}
            />
          ))}
        </div>
        {hasOnClick && (
          <Button className={classes.moreBtn} variant="outlined">
            {t('providers.endpoint.more-btn')}
          </Button>
        )}
      </div>
    </NavLink>
  );
};
