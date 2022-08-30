import { Button, Typography } from '@material-ui/core';

import { AddNetworkButton } from 'domains/auth/components/AddNetwork';
import { IApiChainURL } from 'domains/chains/api/queryChains';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { ChainRequestsLabel } from 'domains/chains/screens/Chains/components/ChainRequestsLabel';
import { ChainMainInfo } from 'modules/common/components/ChainMainInfo';
import { ArchiveLabel } from 'modules/common/components/ChainMainInfo/ArchiveLabel';
import { t } from 'modules/i18n/utils/intl';
import { NavLink } from 'ui';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useStyles } from './ChainsItemStyles';
import { ChainsItemProps } from './ChainsItemTypes';

const publicKey = 'chains.links.public';
const privateKey = 'chains.links.private';

export const ChainsItem = ({
  chain,
  description,
  isLoading,
  logoSrc,
  name,
  period,
  timeframe,
  totalRequests,
  isPremium,
}: ChainsItemProps) => {
  const classes = useStyles();

  const urls = [
    ...chain.urls,
    ...(chain.extensions || []).flatMap<IApiChainURL>(
      extension => extension.urls,
    ),
    ...(chain.extenders || []).flatMap<IApiChainURL>(extender => extender.urls),
  ];

  const dummyMessage = t(isPremium ? privateKey : publicKey, {
    number: urls.length,
  });

  return (
    <NavLink
      isRouterLink
      href={ChainsRoutesConfig.chainDetails.generatePath(chain.id)}
      tabIndex={0}
      className={classes.root}
    >
      <ChainMainInfo
        className={classes.mainInfo}
        description={
          description && (
            <ChainRequestsLabel description={description} label={period} />
          )
        }
        isLoading={isLoading}
        label={chain.isArchive && <ArchiveLabel className={classes.archive} />}
        logoSrc={logoSrc}
        name={name}
        timeframe={timeframe}
        totalRequests={totalRequests}
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
              {dummyMessage}
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
