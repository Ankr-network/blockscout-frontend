import { ReactNode } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

import { t } from 'common';

import { Menu } from 'uiKit/Menu';

import { useCopyTokenAddressHook } from './useCopyTokenAddressHook';

export interface ICopyTokenAddressProps {
  address: string;
  wrapper?: ({ children }: { children: ReactNode }) => JSX.Element;
}

export const CopyTokenAddress = ({
  address,
}: ICopyTokenAddressProps): JSX.Element => {
  const { isCopied, handleCopy } = useCopyTokenAddressHook();

  return (
    <CopyToClipboard text={address} onCopy={handleCopy}>
      <Menu.Item>
        {isCopied
          ? t('dashboard.copied')
          : t('dashboard.card.copyTokenAddress')}
      </Menu.Item>
    </CopyToClipboard>
  );
};
