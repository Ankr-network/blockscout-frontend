import { Paper, Typography } from '@mui/material';
import { IBundleDataEntity, IBundleStatusEntity } from 'multirpc-sdk';

import { useRevokeUserBundleMutation } from 'modules/clients/actions/revokeUserBundle';
import { LoadableButton } from 'uiKit/LoadableButton';

interface IReferralCodeItemProps {
  data: IBundleDataEntity;
  paymentId?: string;
}

const BundleItem = ({ data, paymentId }: IReferralCodeItemProps) => {
  const [deleteBundle, { isLoading }] = useRevokeUserBundleMutation();

  return (
    <li>
      <Typography variant="body2">Name: {data.name}</Typography>
      <br />
      <Typography variant="body2">ID: {data.bundle_id}</Typography>
      <br />
      <Typography variant="body2">Limits:</Typography>
      <ul>
        {data.limits.map(limit => (
          <li key={limit.blockchain_paths}>
            <div>chain: {limit.blockchain_paths}</div>
            <div>limit: {limit.limit}</div>
          </li>
        ))}
      </ul>
      {paymentId && (
        <LoadableButton
          loading={isLoading}
          onClick={() =>
            deleteBundle({
              address: data.bundle_id,
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
  activeBundles: IBundleDataEntity[];
  bundlesStatuses: IBundleStatusEntity[];
}

export const ClientBundles = ({
  activeBundles,
  bundlesStatuses,
}: IClientBundlesProps) => {
  if (!activeBundles.length)
    return <Paper sx={{ p: 4, mt: 6, mb: 6 }}>No active bundles</Paper>;

  return (
    <Paper sx={{ p: 4, mt: 6, mb: 6 }}>
      <Typography component="p" variant="subtitle2">
        Active bundles:
      </Typography>
      <ul>
        {activeBundles.map(x => {
          const paymentId = bundlesStatuses.find(
            y => y.bundleId === x.bundle_id,
          )?.paymentId;

          return (
            <BundleItem key={x.bundle_id} data={x} paymentId={paymentId} />
          );
        })}
      </ul>
    </Paper>
  );
};
