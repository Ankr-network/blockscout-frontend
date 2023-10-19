import { Warning } from '@ankr.com/ui';
import { Typography } from '@mui/material';
import { tHTML } from '@ankr.com/common';

import { useContractAttentionStyles } from './useContractAttentionStyles';

export const ContractAttention = () => {
  const { classes } = useContractAttentionStyles();

  return (
    <div>
      <div className={classes.top}>
        <Warning className={classes.icon} />
        <Typography component="p" variant="body2">
          {tHTML(`projects.add-whitelist-dialog.address-warning`)}
        </Typography>
      </div>
      <div className={classes.code}>
        <code className={classes.codeBadge}>eth_call</code>
        <code className={classes.codeBadge}>eth_getLogs</code>
        <code className={classes.codeBadge}>eth_sendRawTransaction</code>
      </div>
    </div>
  );
};
