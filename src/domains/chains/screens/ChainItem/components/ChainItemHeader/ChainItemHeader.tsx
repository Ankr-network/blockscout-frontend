import React from 'react';
import { Typography, Button, useTheme, useMediaQuery } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { ButtonSpecial } from 'uiKit/ButtonSpecial';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { t } from 'modules/i18n/utils/intl';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useStyles } from './ChainItemHeaderStyles';
import { PrivateHeader } from './PrivateHeader';
import { PlanRoutesConfig } from '../../../../../plan/Routes';

interface ChainItemHeaderProps {
  chain: ResponseData<typeof fetchChain>['chain'];
  hasCredentials: boolean;
  icon: string;
  chainId: string;
  className?: string;
}

export const ChainItemHeader = ({
  chain,
  hasCredentials,
  icon,
  chainId,
  className,
}: ChainItemHeaderProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [formattedChain] = formatChains([chain]);
  const { rpcLinks, name } = formattedChain;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.top}>
        <div className={classes.left}>
          <ChainMainInfo
            logoSrc={icon}
            name={name}
            description={
              <ChainRequestsLabel
                description={name}
                descriptionColor="textSecondary"
              />
            }
          />
          <ButtonSpecial onClick={console.log} />
        </div>

        <div className={classes.right}>
          {rpcLinks.map(link => {
            return isMobile ? (
              <CopyToClipIcon
                key={link}
                text={link}
                message={t('common.copy-message')}
                size="l"
                textColor="textPrimary"
                className={classes.copyToClip}
              />
            ) : (
              <CopyToClipButton
                text={link}
                key={link}
                textMessage={t('common.copy-message')}
                buttonText={t('common.copy-text')}
                className={classes.copyToClip}
              />
            );
          })}
        </div>
      </div>
      {hasCredentials ? (
        <PrivateHeader chainId={chainId} />
      ) : (
        <div className={classes.bottom}>
          <Typography variant="body2" className={classes.text}>
            {t('chain-item.header.bottom')}
          </Typography>

          <Button
            component={RouterLink}
            to={PlanRoutesConfig.plan.generatePath()}
            endIcon={<ArrowRightIcon className={classes.icon} />}
          >
            {t('chain-item.header.button')}
          </Button>
        </div>
      )}
    </div>
  );
};
