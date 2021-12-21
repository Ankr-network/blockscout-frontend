import React, { useMemo } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import { INodeEntity } from '@ankr.com/multirpc';

import { CopyToClipButton } from 'uiKit/CopyToClipButton';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { useIsMDDown } from 'modules/themes/useTheme';
import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { PrivateHeader } from './PrivateHeader';
import { PlanRoutesConfig } from '../../../../../plan/Routes';
import { useStyles } from './ChainItemHeaderStyles';

interface ChainItemHeaderProps {
  chain: ResponseData<typeof fetchChain>['chain'];
  hasCredentials: boolean;
  icon: string;
  chainId: string;
  className?: string;
  nodes?: INodeEntity[];
}

export const ChainItemHeader = ({
  chain,
  hasCredentials,
  icon,
  chainId,
  className,
  nodes,
}: ChainItemHeaderProps) => {
  const classes = useStyles();
  const isMobile = useIsMDDown();
  const [formattedChain] = formatChains([chain]);
  const { rpcLinks, name } = formattedChain;

  const hasArchiveNodes = useMemo(
    () => nodes?.some(item => item.isArchive),
    [nodes],
  );

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <div className={classes.left}>
          <ChainMainInfo
            logoSrc={icon}
            name={name}
            description={
              <div className={classes.description}>
                <ChainRequestsLabel
                  description={name}
                  descriptionColor="textSecondary"
                />
                {hasCredentials && hasArchiveNodes && (
                  <TooltipWrapper
                    hasIcon={false}
                    tooltipText={tHTML(
                      'chain-item.header.archived-node-tooltip-text',
                    )}
                  >
                    <Typography
                      className={classes.archived}
                      variant="caption"
                      color="textSecondary"
                    >
                      {t('chain-item.header.archived')}
                    </Typography>
                  </TooltipWrapper>
                )}
              </div>
            }
          />
          <AddNetworkButton chain={formattedChain} hasPlusIcon />
        </div>

        <div className={classes.right}>
          {rpcLinks.map(link => {
            return isMobile ? (
              <React.Fragment key={link}>
                <Typography
                  variant="body2"
                  className={classNames(classes.text, classes.textPublic)}
                >
                  {t('chain-item.header.right')}
                </Typography>

                <CopyToClipIcon
                  text={link}
                  message={t('common.copy-message')}
                  size="l"
                  textColor="textPrimary"
                  className={classes.copyToClip}
                />
              </React.Fragment>
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
          <TooltipWrapper
            className={classes.tooltip}
            tooltipText={tHTML('chain-item.header.tooltipText')}
          >
            <Typography variant="body2" className={classes.text}>
              {t('chain-item.header.bottom')}
            </Typography>
          </TooltipWrapper>

          <Button
            className={classes.btnUnlock}
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
