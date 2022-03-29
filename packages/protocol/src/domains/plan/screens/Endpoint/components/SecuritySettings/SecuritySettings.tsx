import React from 'react';
import { Typography } from '@material-ui/core';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { useStyles } from './SecuritySettingsStyles';
import { SecuritySettingsProps } from './SecuritySettingsTypes';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { DomainsForm } from './DomainsForm';
import { IpsForm } from './IpsForm';
import { MAX_DOMAIN_COUNT } from './DomainsForm/DomainsForm';
import { MAX_IP_COUNT } from './IpsForm/IpsForm';

export const SecuritySettings = ({ data, chainId }: SecuritySettingsProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TooltipWrapper
        hasIcon
        tooltipText={tHTML('providers.endpoint.security.tooltip-text')}
        className={classes.tooltipWrapper}
        iconClassName={classes.tooltipIcon}
      >
        <Typography variant="body2" className={classes.title}>
          {t('providers.endpoint.security.title')}
        </Typography>
      </TooltipWrapper>

      <div className={classes.container}>
        <div className={classes.left}>
          <Typography variant="body2" className={classes.title}>
            {t('providers.endpoint.security.domain.address-title')}
            <Typography
              className={classes.label}
              variant="body2"
              color="textSecondary"
            >
              {t('providers.endpoint.security.domain.address-count', {
                value: MAX_DOMAIN_COUNT,
              })}
            </Typography>
          </Typography>
          <DomainsForm data={data.domains} chainId={chainId} />
        </div>

        <div className={classes.right}>
          <Typography variant="body2" className={classes.title}>
            {t('providers.endpoint.security.ip.address-title')}
            <Typography
              className={classes.label}
              variant="body2"
              color="textSecondary"
            >
              {t('providers.endpoint.security.ip.address-count', {
                value: MAX_IP_COUNT,
              })}
            </Typography>
          </Typography>
          <IpsForm data={data.ips} chainId={chainId} />
        </div>
      </div>
    </div>
  );
};
