import { Paper, Typography } from '@material-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Address } from '@ankr.com/provider';
import { t } from 'common';

import { useCopyTokenAddressHook } from 'modules/common/hooks/useCopyTokenAddressHook';
import {
  ProviderStatus,
  ProviderStatusTooltip,
} from 'modules/stake-ankr/components/ProviderStatus';
import { EProviderStatus } from 'modules/stake-ankr/const';
import { CompleteIcon } from 'uiKit/Icons/CompleteIcon';
import { CopyIcon } from 'uiKit/Icons/CopyIcon';
import { ExternalLinkIcon } from 'uiKit/Icons/ExternalLinkIcon';
import { NavLink } from 'uiKit/NavLink';

import { ReactComponent as DiscordIcon } from './assets/discord.svg';
import { ReactComponent as TelegramIcon } from './assets/telegram.svg';
import { AdditionalInfo } from './components/AdditionalInfo';
import { NodeList } from './components/NodeList';
import { StakeInfo } from './components/StakeInfo';
import { Stats } from './components/Stats';
import { useProviderInfoStyles } from './useProviderInfoStyles';

interface IProviderInfoProps {
  status: EProviderStatus;
  providerName: string;
  discordLink: string;
  telegramLink: string;
  providerAddress: Address;
  addressLink: string;
  stakeLink: string;
}

export const ProviderInfo = ({
  providerName,
  status,
  discordLink,
  telegramLink,
  providerAddress,
  addressLink,
  stakeLink,
}: IProviderInfoProps): JSX.Element => {
  const classes = useProviderInfoStyles();
  const { isCopied, handleCopy } = useCopyTokenAddressHook();

  const stakeBtnText = t('stake-ankr.total-info.stake');

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.headerRow}>
          <ProviderStatus
            tooltipSlot={
              <ProviderStatusTooltip
                currentPeriod={10}
                latency={40}
                status={status}
                successRate={20}
                totalPeriod={20}
              />
            }
            type={status}
          />

          <Typography variant="h3">{providerName}</Typography>

          <NavLink className={classes.icon} href={discordLink}>
            <DiscordIcon />
          </NavLink>

          <NavLink className={classes.icon} href={telegramLink}>
            <TelegramIcon />
          </NavLink>
        </div>

        <AdditionalInfo />

        <div className={classes.addressRow}>
          <div className={classes.addressWrappes}>
            <Typography className={classes.tokenAddress} color="textSecondary">
              {providerAddress}
            </Typography>

            <div className={classes.addressBtns}>
              {!isCopied ? (
                <CopyToClipboard
                  data-testid="copy-destination-address"
                  text={providerAddress}
                  onCopy={handleCopy}
                >
                  <CopyIcon />
                </CopyToClipboard>
              ) : (
                <CompleteIcon
                  data-testid="copy-destination-address-complete"
                  size="xs"
                />
              )}

              <NavLink className={classes.link} href={addressLink}>
                <ExternalLinkIcon />
              </NavLink>
            </div>
          </div>

          <NavLink className={classes.btn} href={stakeLink} variant="contained">
            {stakeBtnText}
          </NavLink>
        </div>

        <StakeInfo />

        <Stats />
      </Paper>

      <NodeList />
    </>
  );
};
