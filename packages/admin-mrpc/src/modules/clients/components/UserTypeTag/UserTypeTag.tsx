import { Typography } from '@mui/material';
import { clientTypeNaming, colorMap, getClientTypeExpiration } from './const';
import { ClientEntity } from '../../types';

type TUserTypeTagProps = {
  clientType: ClientEntity['type'];
  clientTtl?: ClientEntity['ttl'];
};

export const UserTypeTag = ({ clientType, clientTtl }: TUserTypeTagProps) => {
  const label = clientTypeNaming[clientType];
  const expiration =
    clientTtl && getClientTypeExpiration[clientType]?.(clientTtl);

  return (
    <div>
      <Typography style={{ color: colorMap[clientType] }}>{label}</Typography>

      {expiration && (
        <Typography variant="caption" component="p" color="textSecondary">
          {expiration}
        </Typography>
      )}
    </div>
  );
};
