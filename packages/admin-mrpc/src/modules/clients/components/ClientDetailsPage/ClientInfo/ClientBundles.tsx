import { OverlaySpinner } from '@ankr.com/ui';
import { Paper, Typography } from '@mui/material';
import { IBundleDataEntity, IBundleStatusEntity } from 'multirpc-sdk';

import { useRevokeUserBundleMutation } from 'modules/clients/actions/revokeUserBundle';
import { LoadableButton } from 'uiKit/LoadableButton';

interface IReferralCodeItemProps {
  address: string;
  data: IBundleDataEntity;
  bundleStatus: IBundleStatusEntity;
  paymentId?: string;
  expires: number;
}

const BundleItem = ({
  address,
  data,
  bundleStatus,
  paymentId,
  expires,
}: IReferralCodeItemProps) => {
  const [deleteBundle, { isLoading }] = useRevokeUserBundleMutation();

  return (
    <li>
      <Typography variant="body2">Name: {data.name}</Typography>
      <br />
      <Typography variant="body2">ID: {data.bundle_id}</Typography>
      <br />
      <Typography variant="body2">
        Expires: {new Date(expires * 1_000).toLocaleString()}
      </Typography>
      <br />
      <Typography variant="body2">Limits:</Typography>
      <ul>
        {data.limits.map(limit => {
          const usage = bundleStatus.counters.find(
            x => x.blockchainPaths === limit.blockchain_paths,
          );

          return (
            <li key={limit.blockchain_paths}>
              <div>chain: {limit.blockchain_paths}</div>
              <div>limit: {limit.limit}</div>
              {usage && <div>usage: {usage.usagePercentage}%</div>}
            </li>
          );
        })}
      </ul>
      {paymentId && (
        <LoadableButton
          loading={isLoading}
          onClick={() =>
            deleteBundle({
              address,
              paymentId,
            })
          }
          size="extraSmall"
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Revoke
        </LoadableButton>
      )}
    </li>
  );
};

interface IClientBundlesProps {
  address: string;
  activeBundles: IBundleDataEntity[];
  bundlesStatuses: IBundleStatusEntity[];
  isLoading: boolean;
}

export const ClientBundles = ({
  address,
  activeBundles,
  bundlesStatuses,
  isLoading,
}: IClientBundlesProps) => {
  return (
    <Paper sx={{ p: 4, mt: 6, mb: 6 }}>
      <Typography component="p" variant="subtitle2">
        Active bundles:
      </Typography>
      {isLoading && <OverlaySpinner size={40} />}
      {!isLoading && bundlesStatuses.length === 0 && (
        <Typography variant="body2">No active bundles</Typography>
      )}
      {!isLoading && bundlesStatuses.length > 0 && (
        <ul>
          {activeBundles.map(x => {
            const bundleStatus = bundlesStatuses.find(
              y => y.bundleId === x.bundle_id,
            );

            const paymentId = bundleStatus?.paymentId;

            if (!bundleStatus) return null;

            return (
              <BundleItem
                address={address}
                key={x.bundle_id}
                data={x}
                bundleStatus={bundleStatus}
                paymentId={paymentId}
                expires={bundleStatus.expires}
              />
            );
          })}
        </ul>
      )}
    </Paper>
  );
};
