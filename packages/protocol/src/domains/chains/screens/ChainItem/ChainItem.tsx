import { Paper } from '@mui/material';
import { t } from '@ankr.com/common';
import { Mark } from '@ankr.com/ui';
import { InfoBanner } from 'modules/common/components/InfoBanner';
import { ChainID } from 'domains/chains/types';
import { ChainsRoutesConfig } from 'domains/chains/routes';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { PrivateChainItemQuery } from './PrivateChainItemQuery';
import { PublicChainItemQuery } from './PublicChainItemQuery';
import { useStyles } from './ChainItemStyles';

export const ChainItem = () => {
  const { classes } = useStyles();
  const { chainId } = ChainsRoutesConfig.chainDetails.useParams();

  const { hasPrivateAccess, loading } = useAuth();

  return (
    <NoReactSnap>
      {chainId === ChainID.OPTIMISM && (
        <Paper className={classes.banner}>
          <InfoBanner
            icon={<Mark />}
            message={t('chain-item.banner-optimism')}
          />
        </Paper>
      )}
      {hasPrivateAccess ? (
        <PrivateChainItemQuery chainId={chainId} />
      ) : (
        <PublicChainItemQuery chainId={chainId} loading={loading} />
      )}
    </NoReactSnap>
  );
};
