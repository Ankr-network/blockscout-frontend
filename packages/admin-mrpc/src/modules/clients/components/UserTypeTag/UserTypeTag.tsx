import { Typography } from '@mui/material';
import { clientTypeNaming, getClientTypeExpiration } from './const';
import { ClientEntity } from '../../types';
import { useUserTypeTagStyles as useStyles } from './UserTypeTagStyles';

type TUserTypeTagProps = {
  clientType: ClientEntity['type'];
  clientTtl?: ClientEntity['ttl'];
};

export const UserTypeTag = ({ clientType, clientTtl }: TUserTypeTagProps) => {
  const label = clientTypeNaming[clientType];
  const expiration =
    clientTtl && getClientTypeExpiration[clientType]?.(clientTtl);
  const { classes } = useStyles({ clientType });

  return (
    <div>
      <Typography className={classes.tag}>{label}</Typography>

      {expiration && (
        <Typography variant="caption" component="p" color="textSecondary">
          {expiration}
        </Typography>
      )}
    </div>
  );
};
