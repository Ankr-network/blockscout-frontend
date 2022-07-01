import React from 'react';
import { Button, Typography } from '@material-ui/core';

import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { t } from 'modules/i18n/utils/intl';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ArchiveLabel } from 'modules/common/components/ChainMainInfo/ArchiveLabel';
import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useStyles } from './ChainsItemStyles';
import { ChainsItemProps } from './ChainsItemTypes';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { NavLink } from 'ui';

export const ChainsItem = ({
  totalRequests,
  isLoading,
  logoSrc,
  name,
  description,
  period,
  chain,
}: ChainsItemProps) => {
  const classes = useStyles();

  const urls = [
    ...chain.urls,
    ...(chain.extensions || []).flatMap<IApiChainURL>(
      extension => extension.urls,
    ),
    ...(chain.extenders || []).flatMap<IApiChainURL>(extender => extender.urls),
  ];

  return (
    <NavLink
      isRouterLink
      href={ChainsRoutesConfig.chainDetails.generatePath(chain.id)}
      tabIndex={0}
      className={classes.root}
    >
      <ChainMainInfo
        isLoading={isLoading}
        logoSrc={logoSrc}
        name={name}
        className={classes.mainInfo}
        totalRequests={totalRequests}
        label={chain.isArchive && <ArchiveLabel className={classes.archive} />}
        description={
          description && (
            <ChainRequestsLabel description={description} label={period} />
          )
        }
      />
      <div className={classes.bottom}>
        <div className={classes.links}>
          {urls.length <= 1 ? (
            urls.map(({ rpc }) => (
              <CopyToClipIcon
                text={rpc}
                message={t('common.copy-message')}
                key={rpc}
                className={classes.copyItem}
              />
            ))
          ) : (
            <Typography
              className={classes.dummy}
              variant="body2"
              noWrap
              color="textSecondary"
            >
              {`${urls.length} public links`}
            </Typography>
          )}
        </div>
        <div className={classes.buttonsWrapper}>
          <AddNetworkButton
            chain={chain}
            size="medium"
            className={classes.buttonAddNetwork}
          />
          <Button variant="outlined" color="primary" className={classes.button}>
            {t('chains.more-details')}
          </Button>
        </div>
      </div>
    </NavLink>
  );
};
