import React from 'react';
import { Button, Typography } from '@material-ui/core';

import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { t } from 'modules/i18n/utils/intl';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ArchiveLabel } from 'modules/common/components/ChainMainInfo/ArchiveLabel';
import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useStyles } from './ChainsItemStyles';
import { ChainsItemProps } from './ChainsItemTypes';

export const ChainsItem = ({
  totalRequests,
  isLoading,
  logoSrc,
  name,
  description,
  period,
  links,
  onButtonClick,
  chain,
}: ChainsItemProps) => {
  const classes = useStyles();

  return (
    <div
      onClick={onButtonClick}
      role="button"
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
          {links.length <= 1 ? (
            links.map(link => (
              <CopyToClipIcon
                text={link}
                message={t('common.copy-message')}
                key={link}
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
              {`${links.length} public links`}
            </Typography>
          )}
        </div>
        <div className={classes.buttonsWrapper}>
          <AddNetworkButton
            chain={chain}
            size="medium"
            className={classes.buttonAddNetwork}
          />
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={onButtonClick}
          >
            {t('chains.more-details')}
          </Button>
        </div>
      </div>
    </div>
  );
};
