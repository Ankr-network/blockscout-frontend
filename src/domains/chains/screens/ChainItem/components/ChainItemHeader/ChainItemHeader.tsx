import React, { useMemo } from 'react';
import { Button, Typography } from '@material-ui/core';
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
import { useAuth } from '../../../../../../modules/auth/hooks/useAuth';
import { useIsMDDown } from '../../../../../../modules/themes/useTheme';
import { getMappedNetwork } from './ChainItemHeaderUtils';

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
  const isMobile = useIsMDDown();
  const [formattedChain] = formatChains([chain]);
  const { rpcLinks, name } = formattedChain;
  const { handleAddNetwork, isWalletConnected, handleConnect } = useAuth();
  const mappedNetwork = useMemo(() => getMappedNetwork(formattedChain), [
    formattedChain,
  ]);

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
          {mappedNetwork && (
            <ButtonSpecial
              onClick={
                isWalletConnected
                  ? () => handleAddNetwork(mappedNetwork)
                  : handleConnect
              }
            />
          )}
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
