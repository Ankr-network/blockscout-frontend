import { Typography } from '@mui/material';
import { t, tHTML } from '@ankr.com/common';

import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';

import { DomainsForm } from './DomainsForm';
import { MAX_DOMAIN_COUNT } from './DomainsForm/DomainsForm';
import { IpsForm } from './IpsForm';
import { MAX_IP_COUNT } from './IpsForm/IpsForm';
import { useStyles } from './SecuritySettingsStyles';
import { SecuritySettingsProps } from './SecuritySettingsTypes';

export const SecuritySettings = ({
  chainId,
  data,
  jwtToken,
}: SecuritySettingsProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <TooltipWrapper
        hasIcon
        tooltipText={tHTML('providers.endpoint.security.tooltip-text')}
        className={classes.tooltipWrapper}
      >
        <Typography variant="subtitle1" className={classes.summary}>
          {t('providers.endpoint.security.title')}
        </Typography>
      </TooltipWrapper>
      <div className={classes.container}>
        <div>
          <Typography variant="body2" className={classes.title}>
            {t('providers.endpoint.security.domain.address-title')}
            <Typography
              className={classes.label}
              variant="body2"
              color="textSecondary"
              component="span"
            >
              {t('providers.endpoint.security.domain.address-count', {
                value: MAX_DOMAIN_COUNT,
              })}
            </Typography>
          </Typography>
          <DomainsForm
            data={data.domains}
            chainId={chainId}
            jwtToken={jwtToken}
          />
        </div>

        <div>
          <Typography variant="body2" className={classes.title}>
            {t('providers.endpoint.security.ip.address-title')}
            <Typography
              className={classes.label}
              variant="body2"
              color="textSecondary"
              component="span"
            >
              {t('providers.endpoint.security.ip.address-count', {
                value: MAX_IP_COUNT,
              })}
            </Typography>
          </Typography>
          <IpsForm data={data.ips} chainId={chainId} jwtToken={jwtToken} />
        </div>
      </div>
    </div>
  );
};
