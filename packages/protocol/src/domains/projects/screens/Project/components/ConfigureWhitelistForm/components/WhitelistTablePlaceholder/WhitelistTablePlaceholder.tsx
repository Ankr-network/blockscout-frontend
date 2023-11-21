import { WhitelistItem } from 'multirpc-sdk';

import {
  AddWhitelistButton,
  AddWhitelistButtonProps,
} from '../AddWhitelistButton';
import { WhitelistPlaceholder } from '../WhitelistPlaceholder';
import { useWhitelistTablePlaceholderStyles } from './useWhitelistTablePlaceholderStyles';

export interface WhitelistTablePlaceholderProps
  extends Omit<AddWhitelistButtonProps, 'className' | 'iconClassName'> {
  whitelist: WhitelistItem[];
}

export const WhitelistTablePlaceholder = ({
  setAddDomainContent,
  setAddIPContent,
  setAddSmartContractContent,
  whitelist,
}: WhitelistTablePlaceholderProps) => {
  const { classes } = useWhitelistTablePlaceholderStyles();

  return (
    <div className={classes.root}>
      <WhitelistPlaceholder />
      <AddWhitelistButton
        className={classes.button}
        iconClassName={classes.icon}
        setAddDomainContent={setAddDomainContent}
        setAddIPContent={setAddIPContent}
        setAddSmartContractContent={setAddSmartContractContent}
        whitelist={whitelist}
      />
    </div>
  );
};
