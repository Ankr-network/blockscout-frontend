import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import { INodeEntity } from '@ankr.com/multirpc';

import { Preloader } from 'uiKit/Preloader';
import { ArrowRightIcon } from 'uiKit/Icons/ArrowRightIcon';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { TooltipWrapper } from 'uiKit/TooltipWrapper/TooltipWrapper';
import { fetchChain } from 'domains/chains/actions/fetchChain';
import { formatChains } from 'domains/chains/screens/Chains/components/ChainsList/ChainsListUtils';
import { t, tHTML } from 'modules/i18n/utils/intl';
import { ResponseData } from 'modules/api/utils/ResponseData';
import { AddNetworkButton } from 'modules/auth/components/AddNetwork';
import { PrivateHeader } from './PrivateHeader';
import { PlanRoutesConfig } from '../../../../../plan/Routes';
import { useStyles } from './ChainItemHeaderStyles';
import { MainInfo } from './MainInfo';

interface ChainItemHeaderProps {
  chain: ResponseData<typeof fetchChain>['chain'];
  hasCredentials: boolean;
  icon: string;
  chainId: string;
  className?: string;
  nodes?: INodeEntity[];
  loading: boolean;
}

export const ChainItemHeader = ({
  chain,
  hasCredentials,
  icon,
  chainId,
  className,
  nodes,
  loading,
}: ChainItemHeaderProps) => {
  const classes = useStyles();

  const [formattedChain] = formatChains([chain]);
  const { rpcLinks, name } = formattedChain;

  return (
    <div className={classNames(classes.root, className)}>
      <div className={classes.top}>
        <div className={classes.left}>
          <MainInfo
            name={name}
            hasCredentials={hasCredentials}
            icon={icon}
            nodes={nodes}
          />
          <AddNetworkButton chain={formattedChain} hasPlusIcon />
        </div>

        <div className={classes.right}>
          {rpcLinks.map(link => {
            return (
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
                  copyText={t('common.copy-text')}
                  size="l"
                  textColor="textPrimary"
                  className={classes.copyToClip}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {loading ? (
        <div className={classes.preloaderWrapper}>
          <Preloader centered />
        </div>
      ) : hasCredentials ? (
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
