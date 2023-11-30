import { Button, Tooltip } from '@mui/material';
import { Web3Address } from 'multirpc-sdk';

import { IClientBindingsResult } from '../SearchEmailBindingsInput/useSearchEmailBindingsInput';

interface ClientTooltipProps {
  title: string;
  client: IClientBindingsResult;
  onClientClick: (address?: Web3Address) => void;
  classes: Record<'clientItem' | 'clientButton' | 'tooltipWrapper', string>;
}

export const ClientTooltip = ({
  title,
  client,
  onClientClick,
  classes,
}: ClientTooltipProps) => {
  return (
    <li className={classes.clientItem}>
      <Tooltip
        className={classes.tooltipWrapper}
        placement="left"
        title={title}
      >
        <Button
          variant="text"
          className={classes.clientButton}
          onClick={() => onClientClick(client.address)}
        >
          {client?.email || client.address}
        </Button>
      </Tooltip>
    </li>
  );
};
