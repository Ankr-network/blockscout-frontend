import { OverlaySpinner } from '@ankr.com/ui';
import { Paper, Typography } from '@mui/material';
import { IReferralCodeItem } from 'multirpc-sdk';

import { useDeleteReferralCodeMutation } from 'modules/clients/actions/deleteReferralCode';
import { LoadableButton } from 'uiKit/LoadableButton';
import { ClientMapped } from 'modules/clients/store/clientsSlice';

import { ClientNewReferralCodeModal } from '../ClientNewReferralCodeModal';

interface IReferralCodeItemProps {
  data: IReferralCodeItem;
}

const ReferralCodeItem = ({ data }: IReferralCodeItemProps) => {
  const [deleteReferralCode, { isLoading }] = useDeleteReferralCodeMutation();

  return (
    <li>
      {data.code}
      <LoadableButton
        loading={isLoading}
        onClick={() => deleteReferralCode(data.code)}
        size="extraSmall"
        variant="outlined"
        sx={{ ml: 2 }}
      >
        Delete
      </LoadableButton>
    </li>
  );
};

interface IClientReferralCodesProps {
  currentClient?: ClientMapped;
  referralCodes: IReferralCodeItem[];
  isLoading: boolean;
}

export const ClientReferralCodes = ({
  currentClient,
  referralCodes,
  isLoading,
}: IClientReferralCodesProps) => {
  return (
    <Paper sx={{ p: 4, mt: 6, mb: 6 }}>
      <Typography component="p" variant="subtitle2">
        Referral codes:
      </Typography>
      {currentClient && (
        <ClientNewReferralCodeModal currentClient={currentClient} />
      )}
      {isLoading && <OverlaySpinner size={40} />}
      {!isLoading && referralCodes.length === 0 && (
        <Typography component="p" variant="body2">
          No referral codes
        </Typography>
      )}
      {!isLoading && referralCodes.length > 0 && (
        <ul>
          {referralCodes.map(x => (
            <ReferralCodeItem key={x.code} data={x} />
          ))}
        </ul>
      )}
    </Paper>
  );
};
